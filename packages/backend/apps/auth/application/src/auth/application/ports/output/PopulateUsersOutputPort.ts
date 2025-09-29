import { User } from '@academyjs/backend-auth-domain';

export interface PopulateUsersOutputPort {
  populateUsers(): Promise<User[]>;
}
