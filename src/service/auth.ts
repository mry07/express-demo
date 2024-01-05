import ClientError from "../exception/client-error";
import { HttpStatus } from "../../types";
import { dbPool } from "../config/database";
import * as UserModel from "../model/domain/user";
import { LoginRequest } from "../model/web/auth";
import { comparePasswords } from "../security/password";
import { generateToken, TokenPayload } from "../security/token";

type LoginResult = {
  accessToken: string;
  refreshToken: string;
};

export const login = async (req: LoginRequest): Promise<LoginResult> => {
  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();

    const user = await UserModel.getUserByEmail(connection, req.email);
    if (!user) {
      throw new ClientError(HttpStatus.BAD_REQUEST, "Email does not exist");
    }

    const passwordMatch = await comparePasswords(req.password, user.password);
    if (!passwordMatch) {
      throw new ClientError(HttpStatus.UNAUTHORIZED, "Wrong password");
    }

    const payload: TokenPayload = {
      sub: user.id,
      username: user.username,
    };
    const accessToken = await generateToken(payload);
    const refreshToken = await generateToken(payload, true);

    await connection.commit();

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
