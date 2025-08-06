import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";
const prisma = new PrismaClient();

/**
 * Create a chat room (1 admin + many users)
 * Endpoint: POST /api/chat/room
 */
export const createRoom = async (req: Request, res: Response) => {
  try {
    const { adminId, userIds, name, isGroup } = req.body;

    if (!adminId || !Array.isArray(userIds) || userIds.length === 0) {
      return res
        .status(400)
        .json({ error: "adminId and userIds are required" });
    }

    // ✅ Validate ObjectIds
    if (!ObjectId.isValid(adminId)) {
      return res.status(400).json({ error: "Invalid adminId" });
    }
    for (const id of userIds) {
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: `Invalid userId: ${id}` });
      }
    }

    // ✅ Check if 1-to-1 room already exists
    if (!isGroup && userIds.length === 1) {
      const existingRoom = await prisma.chatRoom.findFirst({
        where: {
          isGroup: false,
          adminId,
          chatRoomUsers: { some: { userId: userIds[0] } },
        },
        include: {
          chatRoomUsers: { include: { user: true } },
          admin: true,
        },
      });

      if (existingRoom) {
        return res.json(existingRoom); // reuse existing room
      }
    }

    // ✅ Create a new room
    const room = await prisma.chatRoom.create({
      data: {
        name: name || null,
        isGroup: isGroup || false,
        adminId,
        chatRoomUsers: {
          create: userIds.map((userId: string) => ({ userId })),
        },
      },
      include: {
        chatRoomUsers: { include: { user: true } },
        admin: true,
      },
    });

    res.status(201).json(room);
  } catch (error: any) {
    console.error("❌ createRoom error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all messages from a room
 * Endpoint: GET /api/chat/room/:roomId/messages
 */
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const messages = await prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: "asc" },
      include: {
        senderUser: true,
        senderAdmin: true,
      },
    });

    res.json(messages);
  } catch (error: any) {
    console.error("❌ getMessages error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Save a new message in a room
 * Endpoint: POST /api/chat/room/:roomId/message
 */
export const saveMessage = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const { senderUserId, senderAdminId, content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Message content is required" });
    }

    const message = await prisma.message.create({
      data: {
        content,
        roomId,
        senderUserId: senderUserId || null,
        senderAdminId: senderAdminId || null,
      },
      include: {
        senderUser: true,
        senderAdmin: true,
      },
    });

    res.status(201).json(message);
  } catch (error: any) {
    console.error("❌ saveMessage error:", error);
    res.status(500).json({ error: error.message });
  }
};
