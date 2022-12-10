import { Box, Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import MessageComponent from "../message/MessageComponent";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { pathLabel } from "../../config/menu";
import { accountByNickname, AccountState } from "../../store/features/account-slice";

function AccountComponent() {
  const dispatch = useAppDispatch();
  const { nickname } = useParams();
  const accountState: AccountState = useAppSelector((state: RootState) => state.account);
  const accessToken: string = useAppSelector((state: RootState) => state.login.response.token.accessToken);

  useEffect(() => {
    if (nickname && !isEmpty(accessToken)) {
      dispatch(accountByNickname({ nickname, accessToken }));
    }
  }, [dispatch, nickname, accessToken]);

  if (accountState.isLoading) {
    return (
      <Box sx={{ display: "flex", m: "50px auto" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isEmpty(accessToken)) {
    return <Navigate to={pathLabel.login.path} />;
  }

  return (
    <Box >
      {!isEmpty(accountState.error) && <MessageComponent isOpen message={accountState.error} type="error" />}
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          image={`${accountState.response.photoUrl}`}
          alt={`${accountState.response.nickname}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {accountState.response.nickname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
            continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AccountComponent;
