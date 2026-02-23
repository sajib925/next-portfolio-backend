import bcrypt from "bcrypt"
import httpStatus from "http-status-codes"
import AppError from "../../errorHelper/appError.js";
import { createUserTokens } from "../../utils/userTokens.js";
import { verifyToken } from "../../utils/jwt.js";
import { PrismaClient } from "@prisma/client";
import type { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();


const login = async (payload: { email: string; password: string }) => {
  const { email, password } = payload

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password)

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password")
  }

  const { password: _, ...userWithoutPassword } = user

  const tokens = createUserTokens({
    userId: user.id,
    email: user.email,
  })

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: userWithoutPassword,
  }
}

const getNewAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, "No refresh token provided")
  }

  const decoded = verifyToken(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as string,
  ) as JwtPayload

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  const tokens = createUserTokens({
    userId: user.id,
    email: user.email,
  })

  return {
    accessToken: tokens.accessToken,
  }
}

const changePassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload,
) => {
  const user = await prisma.user.findUnique({
    where: { id: decodedToken.userId },
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  const isOldPasswordMatch = await bcrypt.compare(
    oldPassword,
    user.password,
  )

  if (!isOldPasswordMatch) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Old password does not match",
    )
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(process.env.BCRYPT_SALT_ROUND),
  )

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      passwordChangedAt: new Date(),
    },
  })
}

const getProfile = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      password: false,
    },
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  return user
}

const updateProfile = async (
  userId: number,
  payload: {
    name?: string
    mobile?: string
    bio?: string
    picture?: string
  },
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      password: false,
    },
  })

  return updatedUser
}

export const AuthServices = {
  login,
  getNewAccessToken,
  changePassword,
  getProfile,
  updateProfile,
}
