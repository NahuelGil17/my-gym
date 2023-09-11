import { User } from '../interfaces/user.interface';

export class GetUsers {
  static readonly type = '[User] Get Users';
  constructor(public readonly payload: { page: number; pageSize: number; searchQ?: string }) {}
}

export class GetUser {
  static readonly type = '[User] Get User';
  constructor(public readonly id: number) {}
}

export class UpdateUser {
  static readonly type = '[User] Update User';
  constructor(public readonly user: User) {}
}

export class DeleteUser {
  static readonly type = '[User] Delete User';
  constructor(public readonly id: number) {}
}
