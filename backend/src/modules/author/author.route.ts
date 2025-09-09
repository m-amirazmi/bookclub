import type { FastifyInstance } from "fastify";

export default async function authorRoutes(server: FastifyInstance) {
  server.get("/", async () => ({ message: "List of authors" }));
}
