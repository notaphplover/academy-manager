import { MailConfig } from './MailConfig';

export interface Environment {
  apiKey: string;
  databaseConnectionString: string;
  frontendBaseUrl: string;
  corsOrigins: string[];
  host: string;
  mailConfig: MailConfig;
  port: number;
}
