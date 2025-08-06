import express, { Router } from "express";
import {
  userRegistration,
  verifyOtp,
  loginUser,
  getUser,
  updateUserPassword,
  refreshToken,
  verifyUserForgotPassword,
  verifyForgotPasswordOtp,
  logoutUser,
} from "../controllers/auth.controller";
import isAuthenticated from "../../../../packages/middleware/isAuthenticated";

const router: Router = express.Router();

// 🔐 Registration & Verification
router.post("/user-registration", userRegistration);
router.post("/verify-otp", verifyOtp);

// 🔐 Login, Logout & Token Refresh
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.post("/refresh-token", refreshToken);

// 🔐 Forgot Password Flow
router.post("/forgot-password", verifyUserForgotPassword);
router.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);

// 🔐 User Profile & Password Management
router.get("/logged-in-user", isAuthenticated, getUser);
router.put("/update-password", isAuthenticated, updateUserPassword);

export default router;
