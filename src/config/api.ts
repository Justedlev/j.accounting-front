import AuthServiceImpl from "../api/impl/AuthServiceImpl";
import AuthService from "../api/AuthService";
import AccountService from "../api/AccountService";
import AccountServiceImpl from "../api/impl/AccountServiceImpl";

const ACCOUNTING_SERVICE_URL = process.env.REACT_APP_ACCOUNTING_SERVICE_URL || "";

export const authService: AuthService = new AuthServiceImpl(`${ACCOUNTING_SERVICE_URL}/api/v1/registration`);

export const accountService: AccountService = new AccountServiceImpl(`${ACCOUNTING_SERVICE_URL}/api/v1`);
