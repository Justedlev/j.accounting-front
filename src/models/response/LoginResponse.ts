import TokenResponse from "./TokenResponse";

interface LoginResponse {
  nickname: string;
  token: TokenResponse;
}

export default LoginResponse;
