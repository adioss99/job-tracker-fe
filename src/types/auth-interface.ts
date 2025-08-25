import type { ApiResponse } from "./api-interface";

export type UserProfileResponse = ApiResponse<{
  id: string;
  name: string;
  email: string;
  role: string;
}>;

// Request
export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest extends LoginRequest {
  name: string;
}

// Response
export type LoginResponse = UserProfileResponse & {
  accessToken: string;
};
export type RegisterResponse = UserProfileResponse;
export type RefreshTokenResponse = ApiResponse<{
  id: string;
  role: string;
}> & {
  accessToken: string;
};
