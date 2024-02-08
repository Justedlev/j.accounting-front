import { Avatar, Card, CardActions, CardContent, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import LoginRequest from "../../models/request/LoginRequest";
import { login, LoginState } from "../../store/features/login-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isEmpty } from "lodash";
import { Navigate, useNavigate } from "react-router-dom";
import MessageComponent from "../message/MessageComponent";
import accountImage from "../../assets/programmer.png";
import { RootState } from "../../store/store";
import { pathLabel } from "../../config/menu";

function LoginComponent() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const loginState: LoginState = useAppSelector((state: RootState) => state.login);
	const accessToken: string = useAppSelector((state: RootState) => state.login.response.token.accessToken);
	const nickname = loginState.response.nickname;

	const [loginInput, setLoginInput] = useState<LoginRequest>(new LoginRequest());

	if (!isEmpty(accessToken) && !isEmpty(nickname)) {
		return <Navigate to={`${pathLabel.account.path}/${nickname}`} />;
	}

	return (
		<>
			{!isEmpty(loginState.error) && (
				<MessageComponent isOpen message={loginState.error} type="error" />
			)}
			<Card sx={{ maxWidth: 345, m: "50px auto", boxShadow: 8, borderRadius: 4 }}>
				<Avatar
					alt="account"
					variant="rounded"
					src={accountImage}
					sx={{ border: 0, width: 100, height: 100, m: "15px auto" }}
				/>
				<CardContent>
					<TextField
						style={{ minWidth: "85%", display: "flex", margin: "auto auto 15px" }}
						id="email"
						label="email"
						value={loginInput.getEmail()}
						onChange={(e) => setLoginInput(loginInput.setEmail(e.target.value))}
					/>
					<TextField
						style={{ minWidth: "85%", display: "flex", margin: "auto" }}
						id="password"
						label="password"
						type="password"
						value={loginInput.getPassword()}
						onChange={(e) => setLoginInput(loginInput.setPassword(e.target.value))}
					/>
				</CardContent>
				<CardActions>
					<LoadingButton
						sx={{ borderRadius: 50 }}
						style={{ minWidth: "30%", margin: "auto" }}
						variant="contained"
						loading={loginState.isLoading}
						onClick={() => dispatch(login(loginInput))}
					>
						login
					</LoadingButton>
				</CardActions>
				<Typography component="p" align="center" sx={{ m: 2 }}>
					{"No have account? "}
					<Link onClick={() => navigate(pathLabel.signup.path)}>{pathLabel.signup.label}</Link>
				</Typography>
			</Card>
		</>
	);
}

export default LoginComponent;
