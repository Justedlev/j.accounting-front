import AccountStatusCode from "../enum/AccountStatusCode";
import Gender from "../enum/Gender";
import Mode from "../enum/Mode";
import ContactResponse from "./ContactResponse";

interface AccountResponse {
  nickname: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: Gender;
  contacts: Array<ContactResponse>;
  status: AccountStatusCode;
  mode: Mode;
  registrationDate: Date;
	avatarUrl: string
}

export default AccountResponse;
