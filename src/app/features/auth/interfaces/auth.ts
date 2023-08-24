export interface NewPasswordRequest {
  userId: string | null;
  resetToken: string | null;
  password?: string | null;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  permissions: string[];
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
