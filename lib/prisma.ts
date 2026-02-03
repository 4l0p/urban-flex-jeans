import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Isso vai mostrar no terminal cada comando SQL executado (ótimo para aprender)
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
