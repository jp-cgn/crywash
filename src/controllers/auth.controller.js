// @ts-check
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";
import { createSession } from "../services/session.service.js";
import { setSessionCookie } from "../utils/cookies.js";
import { createWallet } from "../services/walletServices/walletCreate.js";

export const register = async (req, res) => {
  const { name, email, password, username } = req.body;
  if (!name || !email || !password || !username) {
    return res.status(400).json({ message: "At least one field is missing" });
  }
  const findUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (findUser) {
    return res.status(409).json({ message: "Email or username already used" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      username,
      password: hashedPassword,
      wallets: { create: [{ name: "main", balance: 0 }] },
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      wallets: true,
    },
  });

  const { sid, expiresAt } = await createSession(req, user.id);
  setSessionCookie(res, { sid, expiresAt });
  return res.status(201).json({ message: "User created", user });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "At least one field is missing." });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "user not found" });
    const hashedPassword = user.password;
    const verify = await bcrypt.compare(password, hashedPassword);
    if (!verify) return res.status(401).json({ message: "incorrect Password" });

    const { sid, expiresAt } = await createSession(req, user.id);
    console.log("created session:", { sid, userId: user.id, expiresAt });
    setSessionCookie(res, { sid, expiresAt });

    const safeUser = { id: user.id, name: user.name, email: user.email };
    return res.status(200).json({ message: "Logged in", user: safeUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
