import axios, { AxiosRequestConfig } from "axios";
import { TOKEN_TYPE } from "../../config/app-const";
import AccountResponse from "../../models/response/AccountResponse";
import AccountService from "../AccountService";

export default class AccountServiceImpl implements AccountService {
  constructor(private url: string) {}

	getUrl(): string {
		return `${this.url}/jaccount-service/api/v1`;
	}

  async getAccountByNickname(nickname: string, accessToken: string): Promise<AccountResponse> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `${TOKEN_TYPE} ${accessToken}`,
      },
			withCredentials: true,
    };

    return axios.get<AccountResponse>(`${this.getUrl()}/account/${nickname}`, config).then((response) => response.data);
  }
}
