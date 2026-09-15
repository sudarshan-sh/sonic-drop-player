import bcrypt, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

// hashed password
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// compare password
export const comparePassword = async (password, userPassword) => {
  return bcrypt.compare(password, userPassword);
};

// it signs the token with the user id
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // token expires in 1 hour
  });
};

// cookie options for setting the token in the client's browser
export const cookieOptions = {
  httpOnly: true, // avoid cookie access by JS and travel only from server to browser and vice-versa
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict", // to prevent CSRF attacks
  maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
};

// standardize response function
export const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};
