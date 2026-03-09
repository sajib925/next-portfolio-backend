import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken"

// Payload type for your tokens
export interface UserTokenPayload extends JwtPayload {
  userId: number
  email: string
}

// Generate JWT
export const generateToken = (
  payload: { userId: number; email: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions)
}

// Verify JWT and ensure userId is number
export const verifyToken = (
  token: string,
  secret: string
): UserTokenPayload => {
  const verifiedToken = jwt.verify(token, secret) as JwtPayload & { userId: string | number; email: string }

  return {
    ...verifiedToken,
    userId: Number(verifiedToken.userId), // convert string -> number
    email: verifiedToken.email,
  }
}