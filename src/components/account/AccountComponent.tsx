import { Box, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import MessageComponent from "../message/MessageComponent";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { pathLabel } from "../../config/menu";
import { accountByNickname, AccountState } from "../../store/features/account-slice";

function AccountComponent() {
  const dispatch = useAppDispatch();
  const { nickname } = useParams();
  const navigate = useNavigate();
  const accountState: AccountState = useAppSelector((state: RootState) => state.account);
  const accessToken: string = useAppSelector((state: RootState) => state.login.response.token.accessToken);

  useEffect(() => {
    if (!isEmpty(nickname)) {
      navigate(pathLabel.login.path);
    }
    if (nickname && !isEmpty(accessToken)) {
      dispatch(accountByNickname({ nickname, accessToken }));
    }
  }, [dispatch, navigate, nickname, accessToken]);

  return (
    <>
      {accountState.isLoading ? (
        <Box sx={{ display: "flex", m: "50px auto" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {!isEmpty(accountState.response.nickname) && (
            <MessageComponent isOpen message={`Welcome ${accountState.response.nickname}!`} type="success" />
          )}
          {!isEmpty(accountState.error) && (
            <MessageComponent isOpen message={accountState.error} type="error" />
          )}
          <Typography component="p" align="center" sx={{ m: 5 }}>
            {`Welcome ${accountState.response.nickname}!`}
          </Typography>
        </>
      )}
    </>
  );
}

export default AccountComponent;
