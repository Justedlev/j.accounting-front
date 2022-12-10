import AccountStatusCode from "../enum/AccountStatusCode";
import Gender from "../enum/Gender";
import Mode from "../enum/Mode";
import PhoneNumberResponse from "./PhoneNumberResponse";

interface AccountResponse {
  nickname: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  email: string;
  phoneNumberInfo: PhoneNumberResponse;
  status: AccountStatusCode;
  mode: Mode;
  registrationDate: string;
	photoUrl: string
}

export default AccountResponse;
