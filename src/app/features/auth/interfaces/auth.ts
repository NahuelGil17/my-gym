export interface NewPasswordRequest {
  userId: string | null;
  resetToken: string | null;
  password?: string | null;
}

export interface AuthCredentials {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  needOnboarding: boolean;
  role: Role;
}

interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

interface Permission {
  name: string;
  id: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
