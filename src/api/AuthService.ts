import LoginResponse from "../models/response/LoginResponse";
import LoginRequest from "../models/request/LoginRequest";
import SignupRequest from "../models/request/SignupRequest";
import TokenResponse from "../models/response/TokenResponse";

interface AuthService {
	refresh(refresh: string): Promise<LoginResponse>;
	login(login: LoginRequest): Promise<TokenResponse>;
	signup(signup: SignupRequest): Promise<any>;
	logout(): Promise<any>;
}

export default AuthService;
