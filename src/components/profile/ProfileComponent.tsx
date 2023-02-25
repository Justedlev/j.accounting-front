import { Box, Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import MessageComponent from "../message/MessageComponent";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { pathLabel } from "../../config/menu";
import { accountByNickname, AccountState } from "../../store/features/account-slice";
import justedlevhub from "../../assets/justedlevhub.jpg";

function ProfileComponent() {
  const dispatch = useAppDispatch();
  const { nickname } = useParams();
  const accountState: AccountState = useAppSelector((state: RootState) => state.account);
  const accessToken: string = useAppSelector((state: RootState) => state.login.response.token.accessToken);

  useEffect(() => {
    if (nickname && isEmpty(accountState.response.nickname)) {
      console.log("🚀 ~ file: AccountComponent.tsx:19 ~ useEffect ~ isEmpty(accountState.response.nickname)", isEmpty(accountState.response.nickname))
      dispatch(accountByNickname({ nickname , accessToken }));
    }
  }, [dispatch, nickname, accessToken, accountState.response.nickname]);

  if (accountState.isLoading) {
    return (
      <Box sx={{ display: "flex", m: "50px auto" }}>
        <CircularProgress />
      </Box>
    );
  }

  // if (isEmpty(accessToken)) {
  //   return <Navigate to={pathLabel.login.path} />;
  // }

  return (
    <Box>
      {!isEmpty(accountState.error) && <MessageComponent isOpen message={accountState.error} type="error" />}
      <Card sx={{ maxWidth: 420, margin: "auto", marginTop: "50px" }}>
        <CardMedia
          component="img"
					height="390"
          image={`${accountState.response.avatarUrl || justedlevhub}`}
          alt={`${accountState.response.nickname}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {accountState.response.nickname}
          </Typography>
					{/* {
					accountState.response.contacts.forEach(value => <Typography variant="body2" color="text.secondary">
            Email: {value.email}
          </Typography>)
					} */}
          <Typography variant="body2" color="text.secondary">
            Full name: {accountState.response.firstName} {accountState.response.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Registration: {accountState.response.registrationDate.toDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Birth Date: {accountState.response.birthDate.toDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProfileComponent;
