import axios, { AxiosRequestConfig } from "axios";
import LoginResponse from "../../models/response/LoginResponse";
import LoginRequest from "../../models/request/LoginRequest";
import SignupRequest from "../../models/request/SignupRequest";
import AuthService from "../AuthService";
import { ATK } from "../../config/app-const";

export default class AuthServiceImpl implements AuthService {
  constructor(private url: string) {}

	async refresh(refresh: string) {
    return axios.post<any>(`${this.url}/login/refresh`, { refreshToken: refresh }).then((response) => response.data);
	}

  async logout(): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ATK)}`,
      },
			withCredentials: true,
    };

    return axios.post<any>(`${this.url}/logout`, null, config).then((response) => response.data);
  }

  async login(login: LoginRequest): Promise<LoginResponse> {
    const params = new URLSearchParams({
      ...login,
    });
    const config: AxiosRequestConfig = {
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      withCredentials: true,
    };

    return axios.post(`${this.url}/login`, login, config).then((response) => response.data);
  }

  async signup(signup: SignupRequest): Promise<any> {
    const params = new URLSearchParams({
      ...signup,
      birthDate: signup.birthDate.getTime().toString(),
      gender: signup.gender.toString(),
    });
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      withCredentials: true,
    };

    return axios.post<any>(`${this.url}/signup`, params, config).then((response) => response.data);
  }
}
