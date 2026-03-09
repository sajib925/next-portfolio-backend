import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
async function main() {
    const email = process.env.ADMIN_EMAIL;
    const rawPassword = process.env.ADMIN_PASSWORD;
    if (!email || !rawPassword) {
        throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    }
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            password: hashedPassword,
            name: "Super Admin",
            isActive: true,
            isVerified: true,
        },
    });
    console.log("✅ Super Admin seeded successfully");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
