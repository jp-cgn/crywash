export function setSessionCookie(res, { sid, expiresAt }) {
  res.cookie("sid", sid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expiresAt: expiresAt,
    path: "/",
  });
}

export function clearSessionCookie(res) {
  res.clearCookie("sid", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}
