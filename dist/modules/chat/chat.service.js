import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const openrouter = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});
const getChatResponseFromAI = async (message, sessionId) => {
    let currentSessionId = sessionId;
    if (!currentSessionId) {
        const newSession = await prisma.chatSession.create({
            data: {},
        });
        currentSessionId = newSession.id;
    }
    await prisma.chatMessage.create({
        data: {
            role: "user",
            content: message,
            sessionId: currentSessionId,
        },
    });
    const chatHistory = await prisma.chatMessage.findMany({
        where: { sessionId: currentSessionId },
        orderBy: { createdAt: "asc" },
    });
    const formattedHistory = chatHistory.map((chat) => ({
        role: chat.role,
        content: chat.content,
    }));
    const botConfig = await prisma.botConfig.findUnique({
        where: { id: "current_config" },
    });
    const defaultPrompt = `
        # Role
        You are the official AI Portfolio Assistant of Sajib Ahmed.

        # Objective
        Your job is to help visitors learn about Sajib's web development skills, projects, and experience.

        # Rules & Constraints
        - Be professional, polite, and keep your answers concise.
        - Format your responses using clean Markdown (like bold text or bullet points) to make them easy to read for the visitors.
        - If a visitor asks something unrelated to Sajib, or if you do not know the answer, politely ask them to connect with Sajib directly.
    `.trim();
    const systemPrompt = {
        role: "system",
        content: botConfig?.systemPrompt || defaultPrompt,
    };
    const messages = [systemPrompt, ...formattedHistory];
    const response = await openrouter.chat.completions.create({
        model: "google/gemma-4-26b-a4b-it:free",
        messages: messages,
    });
    const aiReply = response.choices?.[0]?.message?.content?.trim() ||
        "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
    await prisma.chatMessage.create({
        data: {
            role: "assistant",
            content: aiReply,
            sessionId: currentSessionId,
        },
    });
    return {
        reply: aiReply,
        sessionId: currentSessionId,
    };
};
export const ChatServices = {
    getChatResponseFromAI,
};
