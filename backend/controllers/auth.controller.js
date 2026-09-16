import {
  createUserService,
  findUserByEmailService,
} from "../services/auth.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  comparePassword,
  cookieOptions,
  generateToken,
  handleResponse,
  hashPassword,
} from "../helper/helper.js";

export const createUserController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await findUserByEmailService(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    const newUser = await createUserService(name, email, hashedPassword);

    // Generate a JWT token
    const token = generateToken(newUser.id);

    // store token in the cookie that would get set in the client's browser
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in createUserController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// login user
export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return handleResponse(res, 400, "Please provide all the required fields");
  }

  try {
    // find user using email id
    const user = await findUserByEmailService(email);

    if (!user || user.length === 0) {
      return handleResponse(res, 400, "No user found, please register first!");
    }

    const userData = user;

    const isMatch = await comparePassword(password, userData.password);

    if (!isMatch) {
      // if the password does not match, return an error message
      return handleResponse(res, 400, "Please enter a valid password!");
    }

    const token = generateToken(userData.id);

    res.cookie("token", token, cookieOptions);

    return handleResponse(res, 200, "User logged in successfully", {
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get user info
export const getUserController = async (req, res) => {
  // res.json(req.user);
  return handleResponse(res, 200, "User fetched successfully", {
    user: req.user,
  });
};

// logout user
export const logoutUserController = async (req, res) => {
  res.cookie("token", "", cookieOptions);
  return handleResponse(res, 200, "User logged out successfully");
};
