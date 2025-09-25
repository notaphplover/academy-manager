import { inject, injectable } from 'inversify';

import { Environment } from '../models/Environment';
import { EnvironmentLoader } from './EnvironmentLoader';

@injectable()
export class EnvironmentService {
  readonly #environmentLoader: EnvironmentLoader;

  constructor(
    @inject(EnvironmentLoader)
    environmentLoader: EnvironmentLoader,
  ) {
    this.#environmentLoader = environmentLoader;
  }

  public getEnvironment(): Environment {
    return this.#environmentLoader.env;
  }
}
