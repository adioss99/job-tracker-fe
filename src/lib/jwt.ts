import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  iat: number;
  exp: number;
};

const getRemainingTime = (token: string) => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);
    return exp - now; // seconds left
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export { getRemainingTime };
