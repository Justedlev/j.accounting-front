import AccountResponse from "../models/response/AccountResponse";

interface AccountService {
	getAccountByNickname(nickname: string, accessToken: string): Promise<AccountResponse>;
}

export default AccountService;
