import Fastify from "fastify";
import authorRoutes from "./modules/author/author.route";
import { dbPlugin } from "./plugins/db.plugin";

const server = Fastify({ logger: { transport: { target: "pino-pretty" } } });

server.get("/health", async () => ({ status: "ok" }));

async function main() {
  server.register(dbPlugin);
  server.register(authorRoutes, { prefix: "/api/authors" });

  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });
    server.log.info("Server running on http://localhost:3000");
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

main();
