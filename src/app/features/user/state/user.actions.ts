import { User } from '../interfaces/user.interface';

export class GetUsers {
  static readonly type = '[Users] Get Users';
}

export class GetUser {
  static readonly type = '[Users] Get User';
  constructor(public readonly id: number) {}
}

export class UpdateUser {
  static readonly type = '[Users] Update User';
  constructor(public readonly user: User) {}
}

export class DeleteUser {
  static readonly type = '[Users] Delete User';
  constructor(public readonly id: number) {}
}
