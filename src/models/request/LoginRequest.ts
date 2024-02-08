export default class LoginRequest {
	public constructor(
		private nickname: string | null = null,
		private email: string | null = null,
		private password: string | null = null
	) {}

	public getNickname(): string | null {
		return this.nickname;
	}

	public setNickname(nicname: string): LoginRequest {
		this.nickname = nicname;
		return this;
	}

	public getEmail(): string | null {
		return this.email;
	}

	public setEmail(email: string): LoginRequest {
		this.email = email;
		return this;
	}

	public getPassword(): string | null {
		return this.password;
	}

	public setPassword(password: string): LoginRequest {
		this.password = password;
		return this;
	}
}
