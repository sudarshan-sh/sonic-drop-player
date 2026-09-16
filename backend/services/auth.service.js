import { createUser, findUserByEmail, findUserById } from "../models/auth.model.js";

export const createUserService = async (name, email, hashedPassword) => {
  try {
    const user = await createUser(name, email, hashedPassword);
    return user;
  } catch (error) {
    console.error("Error in createUserService:", error);
    throw error;
  }
};

export const findUserByEmailService = async (email) => {
  try {
    const user = await findUserByEmail(email);
    return user;
  } catch (error) {
    console.error("Error in findUserByEmailService:", error);
    throw error;
  }
};

export const findUserByIdService = async (id) => {
  try {
    const user = await findUserById(id);
    return user;
  } catch (error) {
    console.error("Error in findUserByIdService:", error);
    throw error;
  }
};