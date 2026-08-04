export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  message?: string;
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  username: string;
}
