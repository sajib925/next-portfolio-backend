import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const logVisitorAndCount = async (payload: {
  ip: string
  userAgent: string
  page: string
  referrer?: string
  country?: string
  city?: string
  device?: string
  browser?: string
}) => {
  await prisma.visitor.create({ data: payload })

  const count = await prisma.visitor.count()
  return { count }
}

const getAllVisitors = async () =>
  prisma.visitor.findMany({ orderBy: { createdAt: "desc" } })

export const VisitorServices = { logVisitorAndCount, getAllVisitors }