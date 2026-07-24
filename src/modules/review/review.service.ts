import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()
const createReview = async (payload: {
  clientAvatar: string
  clientName: string
  clientDesignation: string
  clientMessage: string
  rating: number
}) => prisma.review.create({ data: payload })

const updateReview = async (id: number, payload: Partial<{
  clientAvatar: string
  clientName: string
  clientDesignation: string
  clientMessage: string
  rating: number
}>) => prisma.review.update({ where: { id }, data: payload })

const getAllReview = async () => prisma.review.findMany({ orderBy: { createdAt: "desc" } })

const deleteReview = async (id: number) => prisma.review.delete({ where: { id } })


export const ReviewServices = {
  createReview,
  getAllReview,
  deleteReview,
  updateReview
}