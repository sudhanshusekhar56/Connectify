import express from "express";
import {
  login,
  logout,
  signup,
  verify,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signup/verify", verify);
router.post("/login", login);
router.post("/logout", logout);

export default router;
