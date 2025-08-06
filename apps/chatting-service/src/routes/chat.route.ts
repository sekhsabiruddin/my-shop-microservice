import { Router } from "express";
import * as chatController from "../controller/chat.controller";

const chatRoutes = Router();

chatRoutes.post("/room", chatController.createRoom);
chatRoutes.get("/room/:roomId/messages", chatController.getMessages);
chatRoutes.post("/room/:roomId/message", chatController.saveMessage);

export default chatRoutes;
