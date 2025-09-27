#!/usr/bin/env node

import {
  AppBetterAuthOptions,
  betterAuthServiceIdentifier,
} from '@academyjs/auth-better-auth';
import { BetterAuth } from '@inversifyjs/http-better-auth';
import { Container } from 'inversify';

import { buildContainer } from '../adapter/inversify/calculations/buildContainer.js';

const container: Container = (await buildContainer()) as unknown as Container;

const betterAuth: BetterAuth<AppBetterAuthOptions> = container.get(
  betterAuthServiceIdentifier,
);

export default betterAuth;
