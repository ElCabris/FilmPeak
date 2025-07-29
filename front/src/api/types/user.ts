export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserRegister {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface TokenResponse {
  access_token: string;
}

export interface UserProfiles {
  email: string;
  profiles: string[];
}

export interface ProfileCreateRequest {
  email: string;
  profile_name: string;
}
