import Gender from "../enum/Gender";

interface SignupRequest {
  email: string;
  phoneNumber: string;
  password: string;
  nickname: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: Gender;
}

export default SignupRequest;
