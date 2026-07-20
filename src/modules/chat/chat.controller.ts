import type { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { ChatServices } from "./chat.service.js";

const prisma = new PrismaClient();

const handleChat = catchAsync(async (req: Request, res: Response) => {
  const { message, sessionId } = req.body;
  const result = await ChatServices.getChatResponseFromAI(message, sessionId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "AI response generated and saved successfully",
    data: result,
  });
});

const getBotConfig = catchAsync(async (req: Request, res: Response) => {
  const result = await prisma.botConfig.findUnique({
    where: { id: "current_config" },
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bot configuration fetched successfully",
    data: result,
  });
});

const updateBotConfig = catchAsync(async (req: Request, res: Response) => {
  const { systemPrompt } = req.body;

  const result = await prisma.botConfig.upsert({
    where: { id: "current_config" },
    update: { systemPrompt },
    create: { id: "current_config", systemPrompt },
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "AI Training data updated successfully",
    data: result,
  });
});

export const ChatControllers = {
  handleChat,
  getBotConfig,
  updateBotConfig,
};