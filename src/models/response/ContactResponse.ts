import PhoneNumberResponse from "./PhoneNumberResponse";

interface ContactResponse {
	main: boolean;
	email: string;
	phoneNumber: PhoneNumberResponse;
}

export default ContactResponse;
