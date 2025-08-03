import { NextFunction, Request, Response } from "express";
import redis from "../../../../packages/libs/redis";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../packages/libs/prisma";
import { sendEmail } from "../utils/sendEmail/sendEmail";
import { AuthError, ValidationError } from "../../../../packages/error-handler";
import { setCookie } from "../utils/cookies/setCookies";
import jwt from "jsonwebtoken";
//it is for user registration
export const userRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists in DB
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const passwordHash = await bcrypt.hash(password, 10);

    // Save in Redis for 10 min
    await redis.set(
      `signup:${email}`,
      JSON.stringify({ name, email, passwordHash, otpHash }),
      "EX",
      600
    );

    await sendEmail(email, "Verify Your Email", "user-activation.mail.ejs", {
      name,
      otp,
    });

    return res.json({ message: "OTP sent to your email" });
  } catch (err) {
    return next(err);
  }
};

//it is for user verify the otp
export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const data = await redis.get(`signup:${email}`);
    if (!data) {
      return res
        .status(400)
        .json({ message: "OTP expired or registration not found" });
    }

    const userData = JSON.parse(data);
    const isOtpValid = await bcrypt.compare(otp, userData.otpHash);

    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Save verified user in DB
    await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.passwordHash,
        isVerified: true,
      },
    });

    // Remove from Redis
    await redis.del(`signup:${email}`);

    return res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

//It is for login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ValidationError("Email and password are required!"));
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return next(new AuthError("Invalid email or password."));
    }

    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      return next(new AuthError("Invalid email or password."));
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user.id, role: "user" },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: "user" },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );

    // Set user tokens
    setCookie(res, "access_token", accessToken);
    setCookie(res, "refresh_token", refreshToken);

    // Success response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: "user",
      },
    });
  } catch (error) {
    next(error);
  }
};

//it is get the loged in user
export const getUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserPassword = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // 1) All fields present?
    if (!currentPassword || !newPassword || !confirmPassword) {
      return next(new ValidationError("All fields are required"));
    }

    // 2) New & confirm match?
    if (newPassword !== confirmPassword) {
      return next(new ValidationError("New passwords do not match"));
    }

    // 3) New ≠ current?
    if (currentPassword === newPassword) {
      return next(
        new ValidationError(
          "New password cannot be the same as the current password"
        )
      );
    }

    // 4) Load user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.password) {
      return next(new AuthError("User not found or password not set"));
    }

    // 5) Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return next(new AuthError("Current password is incorrect"));
    }

    // 6) Hash & store the new one
    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    // 7) Success
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    return next(err);
  }
};

// 🔄 Refresh Access Token
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Refreshing token...");

    const refreshToken =
      req.cookies["refresh_token"] || req.headers.authorization?.split(" ")[1];

    if (!refreshToken) {
      return next(new ValidationError("Unauthorized! No refresh token."));
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as { id: string; role: "user" };

    console.log("decoded token:", decoded);
    if (!decoded || !decoded.id || decoded.role !== "user") {
      return next(new AuthError("Forbidden! Invalid refresh token."));
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return next(new AuthError("Forbidden! Account not found."));
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: "user" },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" }
    );

    setCookie(res, "access_token", newAccessToken);

    return res.status(201).json({ success: true });
  } catch (error) {
    return next(error);
  }
};

// 🔑 Request Forgot Password OTP
export const verifyUserForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ValidationError("Email is required!");
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(new ValidationError("User not found!"));
    }

    res.status(200).json({
      message: "OTP sent to email. Please verify your account.",
    });
  } catch (error) {
    next(error);
  }
};

// 🔑 Verify Forgot Password OTP
export const verifyForgotPasswordOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      throw new ValidationError("Email, OTP, and new password are required!");
    }

    // get OTP data from Redis
    const data = await redis.get(`forgot:${email}`);
    if (!data) {
      return next(new ValidationError("OTP expired or invalid."));
    }

    const { otpHash } = JSON.parse(data);
    const isOtpValid = await bcrypt.compare(otp, otpHash);
    if (!isOtpValid) {
      return next(new ValidationError("Invalid OTP"));
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: { password: passwordHash },
    });

    // clean up OTP
    await redis.del(`forgot:${email}`);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

// 🔐 Logout User
export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Clear cookies
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return next(error);
  }
};
