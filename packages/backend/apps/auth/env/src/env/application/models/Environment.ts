import { MailConfig } from './MailConfig';
import { SuperAdminUser } from './SuperAdminUser';

export interface Environment {
  apiKey: string;
  databaseConnectionString: string;
  corsOrigins: string[];
  host: string;
  mailConfig: MailConfig;
  port: number;
  superAdminList: SuperAdminUser[];
}
