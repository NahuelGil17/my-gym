import { Routine, User } from '../interfaces/user.interface';

export class GetUsers {
  static readonly type = '[User] Get Users';
  constructor(public readonly payload: { page: number; pageSize: number; searchQ?: string; isActive?: boolean }) {}
}

export class GetUser {
  static readonly type = '[User] Get User';
  constructor(public readonly id: number) {}
}

export class SetSelectedUser {
  static readonly type = '[User] Set Selected User';
  constructor(public readonly user: User | null) {}
}

export class SetRoutines {
  static readonly type = '[User] Set Routines';
  constructor(public readonly routines: Routine[]) {}
}

export class UpdateUser {
  static readonly type = '[User] Update User';
  constructor(public readonly user: User) {}
}

export class DesactivateUser {
  static readonly type = '[User] Desactivate User';
  constructor(public readonly id: string) {}
}

export class CreateUser {
  static readonly type = '[User] Create User';
  constructor(public readonly user: User) {}
}

export class CreateRoutine {
  static readonly type = '[User] Create Routine';
  constructor(public readonly routine: Routine) {}
}

export class DeleteRoutineArray {
  static readonly type = '[User] Delete Routine';
  constructor(public readonly index: number) {}
}

export class AddRoutineArray {
  static readonly type = '[User] Add Routine';
  constructor(public readonly routine: Routine) {}
}

export class UpdateRoutineArray {
  static readonly type = '[User] Update Routine';
  constructor(public readonly payload: { routine: Routine; index: number }) {}
}
