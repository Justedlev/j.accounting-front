import Gender from "../enum/Gender";

interface SignupRequest {
	email: string;
	phoneNumber: string;
	password: string;
	nickname: string;
	firstName: string;
	lastName: string;
	birthDate: string | null | undefined;
	gender: Gender | null | undefined;
}

export default SignupRequest;
