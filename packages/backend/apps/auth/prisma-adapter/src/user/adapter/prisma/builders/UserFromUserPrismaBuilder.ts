import { User } from '@academyjs/backend-auth-domain';
import { Builder } from '@academyjs/backend-common';
import { injectable } from 'inversify';

import { User as PrismaUser } from '../../../../../generated';

@injectable()
export class UserFromUserPrismaBuilder implements Builder<User, [PrismaUser]> {
  public build(prismaUser: PrismaUser): User {
    return {
      email: prismaUser.email,
      id: prismaUser.id,
      name: prismaUser.name,
      role: prismaUser.role ?? undefined,
    };
  }
}
