import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import {
  validateLogin,
  validateRegister,
} from "../middleware/validation.middleware.js";

const router = express.Router();

router.post("/login", validateLogin, loginUser);
router.post("/register", validateRegister, registerUser);

export default router;
