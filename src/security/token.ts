import jwt from "jsonwebtoken";

export type TokenPayload = {
  sub: string | number;
  username: string;
};

export const generateToken = async (
  payload: TokenPayload,
  isRefreshToken?: boolean
) => {
  const options: jwt.SignOptions = !isRefreshToken
    ? { expiresIn: "1h", algorithm: "HS256" }
    : {};
  const secret = !isRefreshToken
    ? process.env.TOKEN_SECRET
    : process.env.REFRESH_TOKEN_SECRET;
  return jwt.sign(payload, secret as jwt.Secret, options);
};

export const verifyToken = (token: string, isRefreshToken?: boolean) => {
  const secret = !isRefreshToken
    ? process.env.TOKEN_SECRET
    : process.env.REFRESH_TOKEN_SECRET;

  try {
    return jwt.verify(token, secret as jwt.Secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};
