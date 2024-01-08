import { User } from "../domain/user";

export type LoginRequest = Pick<User, "email" | "password"> & {};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export type RefreshTokenRequest = {
  refresh_token: string;
};

export type RefreshTokenResponse = {
  access_token: string;
};
