import {
  SuperAdminMembership,
  SuperAdminMembershipFindQuery,
} from '@academyjs/backend-auth-domain';

export const findManySuperAdminMembershipOutputPortSymbol: unique symbol =
  Symbol.for(
    '@academyjs/backend-auth-application/FindManySuperAdminMembershipOutputPort',
  );

export interface FindManySuperAdminMembershipOutputPort {
  findMany(
    superAdminMembershipFindQuery: SuperAdminMembershipFindQuery,
  ): Promise<SuperAdminMembership[]>;
}
