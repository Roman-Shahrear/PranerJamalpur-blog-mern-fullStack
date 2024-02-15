import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    console.error('No token found');
    return next(errorHandler(401, `Unauthorized: No token found`));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err);
      return next(errorHandler(401, `Unauthorized: Token verification failed`));
    }
    console.log('Decoded User:', user);
    if (!user.isAdmin) {
      console.error('User is not an admin');
      return next(errorHandler(403, 'You are not allowed to see all users'));
    }
    req.user = user;
    next();
  });
};