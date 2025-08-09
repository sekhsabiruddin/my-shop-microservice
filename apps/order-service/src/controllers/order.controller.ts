// controllers/payments.controller.ts
import { Request, Response, NextFunction } from "express";
import crypto from "crypto"; // ← add this
import { prisma } from "../../../../packages/libs/prisma";
import { AuthError, ValidationError } from "../../../../packages/error-handler";
import razorpay from "../../../../packages/libs/razorpay";

const toPaise = (r: number) => Math.round(Number(r) * 100);

// CREATE
export const createRazorpayOrder = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, cartItems, currency = "INR", notes } = req.body;
    const userId = req.user?.id;
    if (!userId) throw new AuthError("User not authenticated");
    if (!amount || typeof amount !== "number" || amount <= 0) {
      throw new ValidationError("Amount must be a positive number");
    }

    const orderRecord = await prisma.order.create({
      data: {
        userId,
        amountPaise: toPaise(amount),
        currency,
        notes,
        status: "CREATED",
        cartItems,
      },
    });

    const rzpOrder = await razorpay.orders.create({
      amount: orderRecord.amountPaise,
      currency,
      receipt: orderRecord.id,
      notes,
    });

    await prisma.order.update({
      where: { id: orderRecord.id },
      data: { razorpayOrderId: rzpOrder.id, status: "ATTEMPTED" },
    });

    // return internal orderId so client can send it during verify
    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      order: rzpOrder,
      orderId: orderRecord.id,
    });
  } catch (error) {
    console.error("Create order error:", error);
    next(error);
  }
};

// VERIFY (signature check only; no capture here)
export const verifyRazorpayPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body ?? {};
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !orderId
    ) {
      throw new ValidationError("Missing required fields");
    }

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const ok = expected === razorpay_signature;

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        signatureVerified: ok,
        status: ok ? "PAID" : "FAILED",
      },
    });

    return res.json({ success: ok, orderId: updated.id });
  } catch (error) {
    console.error("Verify error:", error);
    next(error);
  }
};

// CAPTURE (use only when your flow is manual capture)
export const captureRazorpayPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId, paymentId, amount, currency = "INR" } = req.body ?? {};
    if (!paymentId || !amount || !orderId) {
      throw new ValidationError("orderId, paymentId and amount required");
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new ValidationError("Order not found");

    // prevent capture if signature not verified / already captured
    if (!order.signatureVerified || order.status === "CAPTURED") {
      throw new ValidationError("Payment not eligible for capture");
    }

    // sanity check amounts
    if (toPaise(amount) !== order.amountPaise) {
      throw new ValidationError("Amount mismatch for capture");
    }

    const captured = await razorpay.payments.capture(
      paymentId,
      order.amountPaise,
      currency
    );

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "CAPTURED" },
    });

    res.json({ success: true, captured });
  } catch (error) {
    console.error("Capture error:", error);
    next(error);
  }
};
