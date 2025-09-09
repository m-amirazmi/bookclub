import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dbPlugin = fp(async (server) => {
  server.decorate("db", prisma);
  server.addHook("onClose", async () => {
    await prisma.$disconnect();
  });
});

// Extend FastifyInstance Type
declare module "fastify" {
  interface FastifyInstance {
    db: PrismaClient;
  }
}
