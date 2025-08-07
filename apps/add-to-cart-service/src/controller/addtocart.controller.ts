import { Request, Response } from "express";
import { prisma } from "../../../../packages/libs/prisma/index";
export const addToCart = async (req: any, res: Response) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const cartItem = await prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId } },
      update: { quantity: { increment: quantity } },
      create: { userId, productId, quantity },
    });

    res.status(200).json({ message: "Added to cart", cartItem });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromCart = async (req: any, res: Response) => {
  try {
    const { productId } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    await prisma.cartItem.delete({
      where: { userId_productId: { userId, productId } },
    });

    res.status(200).json({ message: "Removed from cart" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const increaseQuantity = async (req: any, res: Response) => {
  try {
    const { productId } = req.body;
    const userId = req.user?.id;

    const updated = await prisma.cartItem.update({
      where: { userId_productId: { userId, productId } },
      data: { quantity: { increment: 1 } },
    });

    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const decreaseQuantity = async (req: any, res: Response) => {
  try {
    const { productId } = req.body;
    const userId = req.user?.id;

    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (!existing || existing.quantity <= 1) {
      await prisma.cartItem.delete({
        where: { userId_productId: { userId, productId } },
      });
      return res.status(200).json({ message: "Item removed from cart" });
    }

    const updated = await prisma.cartItem.update({
      where: { userId_productId: { userId, productId } },
      data: { quantity: { decrement: 1 } },
    });

    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCart = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    res.status(200).json(cartItems);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
