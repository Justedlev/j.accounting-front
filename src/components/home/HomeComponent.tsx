import { Link, Typography } from "@mui/material";
import { pathLabel } from "../../config/menu";
import { LoginState } from "../../store/features/login-slice";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

function HomeComponent() {
  const loginState: LoginState = useAppSelector((state: RootState) => state.login);
  const accountUrl = `${pathLabel.account.path}/${loginState.response.nickname}`;

  return (
    <Typography component="p" align="center" sx={{ m: 5 }}>
      Welcome in j.Hub! {<Link href={accountUrl}>{loginState.response.nickname}</Link>}
    </Typography>
  );
}

export default HomeComponent;
