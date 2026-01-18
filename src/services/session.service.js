// @ts-check
import crypto from "crypto";
import prisma from "../db/prisma.js";

const SESSION_TTL_DAYS = 7;

function newSid() {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(req, userId) {
  const sid = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(
    Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000
  );

  await prisma.session.create({
    data: {
      id: sid,
      userId,
      expiresAt,
      ip: req.ip,
      userAgent: req.get("user-agent") ?? null,
    },
  });

  return { sid, expiresAt };
}

export async function deleteSession(sid) {
  if (!sid) return;
  await prisma.session.delete({ where: { id: sid } }).catch(() => {});
}

export async function getSessionWithUser(sid) {
  if (!sid) return null;
  return prisma.session.findUnique({
    where: { id: sid },
    include: { user: true },
  });
}
