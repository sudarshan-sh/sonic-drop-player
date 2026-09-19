import jwt from "jsonwebtoken";
import { findUserByIdService } from "../services/auth.service.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token!" });
    }

    // checks and verify the signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserByIdService(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found!" });
    }

    req.user = { id: decoded.id };
    next(); // calling the next function to proceed to next middleware or route handler
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Not authorized, token failed!" });
  }
};
