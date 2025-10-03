import { Guard } from '@inversifyjs/framework-core';
import { ConsoleLogger, Logger } from '@inversifyjs/logger';
import { HonoRequest } from 'hono';

const blackList: Set<string> = new Set<string>(['/api/auth/sign-up/email']);

export class AuthGuard implements Guard<HonoRequest> {
  readonly #logger: Logger;

  constructor() {
    this.#logger = new ConsoleLogger('AuthGuard');
  }

  public activate(request: HonoRequest): boolean {
    const path: string = request.path;

    const activated: boolean = !blackList.has(path);

    this.#logger.info(
      `AuthGuard activated: ${String(activated)} for path: ${path}`,
    );

    return activated;
  }
}
