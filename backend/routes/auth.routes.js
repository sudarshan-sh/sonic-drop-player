import express from "express";
import {
  createUserController,
  loginUserController,
  logoutUserController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", createUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

export default router;
