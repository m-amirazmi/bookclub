import { FastifyBaseLogger, FastifyRequest } from "fastify";

export class LoggerHelper {
  constructor(private readonly module: string) {}
  public log(request: FastifyRequest, context?: string): FastifyBaseLogger {
    return request.log.child({
      module: this.module,
      request: request.id,
      context,
      method: request.method,
      path: request.routeOptions.url,
      url: request.raw.url,
    });
  }
}
