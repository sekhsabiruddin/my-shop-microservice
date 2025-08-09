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
  loginAdmin,
  refreshAdminToken,
  getAdmin,
  logoutAdmin,
  updateUserProfile,
} from "../controllers/auth.controller";
import isAuthenticated from "../../../../packages/middleware/isAuthenticated";
import isAdminAuthenticated from "../../../../packages/middleware/isAdminAuthenticated";

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

//=======================it for admin =========================
router.post("/login-admin", loginAdmin);
router.post("/admin-refresh-token", refreshAdminToken);
router.get("/logged-in-admin", isAdminAuthenticated, getAdmin);
router.post("/logout-admin", isAdminAuthenticated, logoutAdmin);
router.put("/update-profile", isAuthenticated, updateUserProfile);

export default router;
