//@ts-check

import {
  getSessionWithUser,
  deleteSession,
} from "../services/session.service.js";

export const authMiddleware = async (req, res, next) => {
  try {
    console.log("cookies:", req.cookies);
    console.log("sid:", req.cookies?.sid);

    const sid = req.cookies?.sid;
    if (!sid) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const session = await getSessionWithUser(sid);
    if (!session) {
      return res.status(401).json({ message: "Invalid session" });
    }

    if (session.expiresAt <= new Date()) {
      await deleteSession(sid);
      res.clearCookie("sid", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
      return res.status(401).json({ message: "Session expired" });
    }
    const { password, ...safeUser } = session.user;

    req.user = safeUser;
    req.session = { id: session.id, expiresAt: session.expiresAt };

    return next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
