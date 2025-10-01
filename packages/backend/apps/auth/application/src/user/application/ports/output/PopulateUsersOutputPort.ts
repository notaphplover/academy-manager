export const populateUsersOutputPortSymbol: unique symbol = Symbol.for(
  '@academyjs/backend-auth-application/PopulateUsersOutputPort',
);

export interface PopulateUsersOutputPortUser {
  email: string;
  name: string;
}

export interface PopulateUsersOutputPort {
  populateUsers(users: PopulateUsersOutputPortUser[]): Promise<void>;
}
