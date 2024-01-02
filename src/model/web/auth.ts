import { User } from "../domain/user";

export type LoginRequest = Pick<User, "email" | "password"> & {};
