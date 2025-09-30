import { SeedSuperAdminUsersInputPort } from '@academyjs/backend-auth-application';
import { Container } from 'inversify';

import { buildContainer } from './app/adapter/inversify/calculations/buildContainer';

const container: Container = await buildContainer();

const seedSuperAdminUsersInputPort: SeedSuperAdminUsersInputPort =
  container.get(SeedSuperAdminUsersInputPort);

await seedSuperAdminUsersInputPort.seedSuperAdminUsers();
