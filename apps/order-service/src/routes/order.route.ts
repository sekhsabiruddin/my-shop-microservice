import express, { Router } from "express";
import {
  captureRazorpayPayment,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/order.controller";
import isAuthenticated from "../../../../packages/middleware/isAuthenticated";
// import isAdminAuthenticated from "../../../../packages/middleware/isAdminAuthenticated";

const router: Router = express.Router();

// Public routes (no authentication required)
// router.post("/webhook", handleWebhook); // Razorpay webhook - should be before other routes

// User routes (authentication required)
router.use(isAuthenticated); // Apply authentication to all routes below

// Create Razorpay order
router.post("/create-order", createRazorpayOrder);

router.post("/verify-payment", verifyRazorpayPayment); // verify only
router.post("/capture", captureRazorpayPayment);

// Admin routes (admin authentication required)
// router.use(isAdminAuthenticated); // Apply admin authentication to routes below

// Get all orders (admin only)
// router.get("/admin/orders", getAllOrders);

// Update order status (admin only)
// router.patch("/admin/order/:id/status", updateOrderStatus);

// Get order statistics (admin only)
// router.get("/admin/stats", getOrderStats);

export default router;
