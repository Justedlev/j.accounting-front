import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import SignupRequest from "../../models/request/SignupRequest";
import { clearErrorMessage, signup, SignupState } from "../../store/features/signup-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import MessageComponent from "../message/MessageComponent";

function SignupComponent() {
	const dispatch = useAppDispatch();
	const signupState: SignupState = useAppSelector((state) => state.signup);

	useEffect(() => {
		dispatch(clearErrorMessage());
	}, [dispatch]);

	const [signupInput, setSignupInput] = useState<SignupRequest>({
		email: "",
		phoneNumber: "",
		password: "",
		nickname: "",
		firstName: "",
		lastName: "",
		gender: null,
		birthDate: null,
	});

	return (
		<div style={{ width: "100%", display: "inline-grid", margin: "25px auto" }}>
			<div style={{ width: "40%", display: "inline-grid", margin: "25px auto" }}>
				{!isEmpty(signupState.error) && (
					<MessageComponent isOpen message={signupState.error} type="error" />
				)}
				<TextField
					style={{ width: "85%", display: "flex", margin: "15px auto" }}
					id="email"
					label="email"
					value={signupInput.email}
					onChange={(e) => setSignupInput({ ...signupInput, email: e.target.value })}
				/>
				<TextField
					style={{ width: "85%", display: "flex", margin: "15px auto" }}
					id="nickname"
					label="Ник"
					value={signupInput.nickname}
					onChange={(e) => setSignupInput({ ...signupInput, nickname: e.target.value })}
				/>
				<TextField
					style={{ width: "85%", display: "flex", margin: "15px auto" }}
					id="firstName"
					label="First Name"
					value={signupInput.firstName}
					onChange={(e) => setSignupInput({ ...signupInput, firstName: e.target.value })}
				/>
				<TextField
					style={{ width: "85%", display: "flex", margin: "15px auto" }}
					id="lastName"
					label="Last Name"
					value={signupInput.lastName}
					onChange={(e) => setSignupInput({ ...signupInput, lastName: e.target.value })}
				/>
				<TextField
					style={{ width: "85%", display: "flex", margin: "25px auto" }}
					id="password"
					label="Пароль"
					type="password"
					value={signupInput.password}
					onChange={(e) => setSignupInput({ ...signupInput, password: e.target.value })}
				/>
				<LoadingButton
					style={{ width: "40%", display: "flex", margin: "25px auto" }}
					variant="outlined"
					loading={signupState.isLoading}
					onClick={() => dispatch(signup(signupInput))}
				>
					Sin Up
				</LoadingButton>
			</div>
		</div>
	);
}

export default SignupComponent;
