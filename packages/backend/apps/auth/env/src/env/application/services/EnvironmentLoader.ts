import { EnvLoader } from '@academyjs/backend-env';
import { bool, cleanEnv, email, host, json, port, str, url } from 'envalid';
import { injectable } from 'inversify';

import { Environment } from '../models/Environment';
import { EnvironmentRaw } from '../models/EnvironmentRaw';

const DEFAULT_DOT_ENV_PATH: string = '.env';
const DOT_ENV_PATH_ENV_VAR: string = 'ACADEMY_JS_AUTH_SERVICE_DOT_ENV_PATH';
const DOT_ENV_ENABLED_ENV_VAR: string =
  'ACADEMY_JS_AUTH_SERVICE_DOT_ENV_ENABLED';

@injectable()
export class EnvironmentLoader extends EnvLoader<Environment> {
  public static build(): EnvironmentLoader {
    const dotEnvPath: string =
      process.env[DOT_ENV_PATH_ENV_VAR] ?? DEFAULT_DOT_ENV_PATH;

    const environmentLoader: EnvironmentLoader = new EnvironmentLoader(
      dotEnvPath,
    );

    return environmentLoader;
  }

  protected _parseEnv(env: Record<string, string>): Environment {
    const rawEnvironment: EnvironmentRaw = cleanEnv(env, {
      ACADEMY_JS_AUTH_SERVICE_API_KEY: str(),
      ACADEMY_JS_AUTH_SERVICE_CORS_ORIGINS: json(),
      ACADEMY_JS_AUTH_SERVICE_DATABASE_CONNECTION_STRING: url(),
      ACADEMY_JS_AUTH_SERVICE_HOST: host(),
      ACADEMY_JS_AUTH_SERVICE_MAIL_DEFAULT_ADDRESS: email(),
      ACADEMY_JS_AUTH_SERVICE_MAIL_HOST: host(),
      ACADEMY_JS_AUTH_SERVICE_MAIL_PASSWORD: str(),
      ACADEMY_JS_AUTH_SERVICE_MAIL_PORT: port(),
      ACADEMY_JS_AUTH_SERVICE_MAIL_USE_TLS: bool(),
      ACADEMY_JS_AUTH_SERVICE_MAIL_USER: str(),
      ACADEMY_JS_AUTH_SERVICE_PORT: port(),
    });

    return {
      apiKey: rawEnvironment.ACADEMY_JS_AUTH_SERVICE_API_KEY,
      corsOrigins: rawEnvironment.ACADEMY_JS_AUTH_SERVICE_CORS_ORIGINS,
      databaseConnectionString:
        rawEnvironment.ACADEMY_JS_AUTH_SERVICE_DATABASE_CONNECTION_STRING,
      host: rawEnvironment.ACADEMY_JS_AUTH_SERVICE_HOST,
      mailConfig: {
        authPassword: rawEnvironment.ACADEMY_JS_AUTH_SERVICE_MAIL_PASSWORD,
        authUser: rawEnvironment.ACADEMY_JS_AUTH_SERVICE_MAIL_USER,
        defaultAddress:
          rawEnvironment.ACADEMY_JS_AUTH_SERVICE_MAIL_DEFAULT_ADDRESS,
        host: rawEnvironment.ACADEMY_JS_AUTH_SERVICE_MAIL_HOST,
        port: rawEnvironment.ACADEMY_JS_AUTH_SERVICE_MAIL_PORT,
        useTls: rawEnvironment.ACADEMY_JS_AUTH_SERVICE_MAIL_USE_TLS,
      },
      port: rawEnvironment.ACADEMY_JS_AUTH_SERVICE_PORT,
    };
  }

  protected override _shouldParseEnvFile(): boolean {
    return process.env[DOT_ENV_ENABLED_ENV_VAR] !== 'false';
  }
}
