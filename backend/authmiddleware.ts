import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
}
