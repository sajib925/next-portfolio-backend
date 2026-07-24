import { Prisma } from "@prisma/client";
export type IUpdateProfilePayload = Omit<Prisma.UserUpdateInput, "id" | "password" | "createdAt" | "updatedAt" | "lastLogin" | "passwordChangedAt" | "loginAttempts">;
//# sourceMappingURL=index.d.ts.map