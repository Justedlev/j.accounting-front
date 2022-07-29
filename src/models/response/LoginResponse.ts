import TokenResponse from "./TokenResponse";

interface LoginResponse {
  email: string;
  nickname: string;
  token: TokenResponse;
}

export default LoginResponse;
