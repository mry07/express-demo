import { Handler } from "../../types";
import { LoginRequest, LoginResponse } from "../model/web/auth";
import * as Service from "../service/auth";

export const login: Handler<
  unknown,
  LoginRequest,
  LoginResponse,
  unknown
> = async (req, res, next) => {
  try {
    const result = await Service.login(req.body);

    res.json({
      data: {
        access_token: result.accessToken,
        refresh_token: result.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
