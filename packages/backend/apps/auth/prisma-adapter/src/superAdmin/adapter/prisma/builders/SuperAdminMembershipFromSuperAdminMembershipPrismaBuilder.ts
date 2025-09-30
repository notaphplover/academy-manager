import { SuperAdminMembership } from '@academyjs/backend-auth-domain';
import { Builder } from '@academyjs/backend-common';
import { injectable } from 'inversify';

import { SuperAdminMembership as PrismaSuperAdminMembership } from '../../../../../generated';

@injectable()
export class SuperAdminMembershipFromSuperAdminMembershipPrismaBuilder
  implements Builder<SuperAdminMembership, [PrismaSuperAdminMembership]>
{
  public build(
    prismaSuperAdminMembership: PrismaSuperAdminMembership,
  ): SuperAdminMembership {
    return {
      createdAt: prismaSuperAdminMembership.createdAt,
      id: prismaSuperAdminMembership.id,
      userId: prismaSuperAdminMembership.userId,
    };
  }
}
