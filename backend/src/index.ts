import Fastify from "fastify";
import cors from "@fastify/cors";
import authorRoutes from "./modules/author/author.route";
import { dbPlugin } from "./plugins/db.plugin";
import { responsePlugin } from "./plugins/response.plugin";
import genreRoutes from "./modules/book/genre/genre.route";
import bookRoutes from "./modules/book/book.route";

const server = Fastify({ logger: { transport: { target: "pino-pretty" } } });

server.get("/health", async () => ({ status: "ok" }));

async function main() {
  await server.register(cors, {
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  });
  await server.register(dbPlugin);
  await server.register(responsePlugin);

  server.register(authorRoutes, { prefix: "/api/authors" });
  server.register(genreRoutes, { prefix: "/api/genres" });
  server.register(bookRoutes, { prefix: "/api/books" });

  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });
    server.log.info("Server running on http://localhost:3000");
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

main();
