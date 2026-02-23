import { generateToken } from "./jwt.js"

interface UserTokenPayload {
  userId: number
  email: string
}

export const createUserTokens = (user: UserTokenPayload) => {
  const jwtPayload = {
    userId: user.userId,
    email: user.email,
  }

  const accessToken = generateToken(jwtPayload, process.env.JWT_ACCESS_SECRET as string, process.env.JWT_ACCESS_EXPIRES as string)
  const refreshToken = generateToken(jwtPayload, process.env.JWT_REFRESH_SECRET as string, process.env.JWT_REFRESH_EXPIRES as string)

  return {
    accessToken,
    refreshToken,
  }
}
