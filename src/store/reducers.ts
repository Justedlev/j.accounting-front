import accountReducer from './features/account-slice';
import loginReducer from "./features/login-slice";
import signupReducer from "./features/signup-slice";
import appReducer from "./features/app-slice";

const reducers = {
  login: loginReducer,
  signup: signupReducer,
  application: appReducer,
	account: accountReducer
};

export default reducers;
