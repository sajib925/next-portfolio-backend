import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()
const createReview = async (payload: {
  clientAvatar: string
  clientName: string
  clientDesignation: string
  clientMessage: string
}) => prisma.review.create({ data: payload })

const getAllReview = async () => prisma.review.findMany({ orderBy: { createdAt: "desc" } })

const deleteReview = async (id: number) => prisma.review.delete({ where: { id } })


export const ReviewServices = {
  createReview,
  getAllReview,
  deleteReview,
}