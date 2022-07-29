import LoginResponse from "../models/response/LoginResponse";
import LoginRequest from "../models/request/LoginRequest";
import SignupRequest from "../models/request/SignupRequest";

interface AuthService {
	refresh(refresh: string): Promise<LoginResponse>;
	login(login: LoginRequest): Promise<LoginResponse>;
	signup(signup: SignupRequest): Promise<any>;
	logout(): Promise<any>;
}

export default AuthService;
