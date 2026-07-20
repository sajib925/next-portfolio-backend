import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const createReview = async (payload) => prisma.review.create({ data: payload });
const getAllReview = async () => prisma.review.findMany({ orderBy: { createdAt: "desc" } });
const deleteReview = async (id) => prisma.review.delete({ where: { id } });
export const ReviewServices = {
    createReview,
    getAllReview,
    deleteReview,
};
