import { User, UserUpdateQuery } from '@academyjs/backend-auth-domain';

export const updateManyUsersOutputPortSymbol: unique symbol = Symbol.for(
  '@academyjs/backend-auth-application/UpdateManyUsersOutputPort',
);

export interface UpdateManyUsersOutputPort {
  updateMany(superAdminMembershipUpdateQuery: UserUpdateQuery): Promise<User[]>;
}
