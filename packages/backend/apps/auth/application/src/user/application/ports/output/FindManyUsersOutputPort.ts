import { User, UserFindQuery } from '@academyjs/backend-auth-domain';

export const findManyUsersOutputPortSymbol: unique symbol = Symbol.for(
  '@academyjs/backend-auth-application/FindManyUsersOutputPort',
);

export interface FindManyUsersOutputPort {
  findMany(superAdminMembershipFindQuery: UserFindQuery): Promise<User[]>;
}
