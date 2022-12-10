import { AxiosError } from 'axios';
import { accountService } from "./../../config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ErrorDetails from "../../models/ErrorDetails";
import { SOMETHING_WENT_WRONG } from "../../config/app-const";
import AccountResponse from "../../models/response/AccountResponse";
import Gender from "../../models/enum/Gender";
import AccountStatusCode from "../../models/enum/AccountStatusCode";
import Mode from "../../models/enum/Mode";

export interface AccountState {
  isLoading: boolean;
  response: AccountResponse;
  error: string;
}

const initialState: AccountState = {
  isLoading: false,
  response: {
    nickname: "",
    firstName: "",
    lastName: "",
    birthDate: 0,
    gender: Gender.UNDEFINED,
    email: "",
    phoneNumberInfo: {
      fullNumber: "",
      countryCode: 0,
      nationalNumber: 0,
      regionCode: "",
    },
    status: AccountStatusCode.UNDEFINED,
    mode: Mode.UNDEFINED,
    registrationDate: "",
		photoUrl: ""
  },
  error: "",
};

export const accountByNickname = createAsyncThunk<
  AccountResponse,
  { nickname: string, accessToken: string },
  { rejectValue: AxiosError<ErrorDetails> }
>("account/nickname", async (request, thunkApi) =>
  accountService
    .getAccountByNickname(request.nickname, request.accessToken)
    .catch((error) => thunkApi.rejectWithValue(error.response.data || error))
);

const accountSlice = createSlice({
  name: "accountByEmail",
  initialState,
  reducers: {
    clearAccountError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(accountByNickname.pending, (state) => {
        state.response = {
          nickname: "",
          firstName: "",
          lastName: "",
          birthDate: 0,
          gender: Gender.UNDEFINED,
          email: "",
          phoneNumberInfo: {
            fullNumber: "",
            countryCode: 0,
            nationalNumber: 0,
            regionCode: "",
          },
          status: AccountStatusCode.UNDEFINED,
          mode: Mode.UNDEFINED,
          registrationDate: "",
					photoUrl: ""
        };
        state.error = "";
        state.isLoading = true;
      })
      .addCase(accountByNickname.fulfilled, (state, { payload }) => {
        state.response = { ...state.response, ...payload };
        state.isLoading = false;
      })
      .addCase(accountByNickname.rejected, (state, action) => {
        console.log("🚀 ~ file: account-slice.ts:88 ~ .addCase ~ action", action)
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = SOMETHING_WENT_WRONG;
        }
        state.isLoading = false;
      });
  },
});

export const { clearAccountError } = accountSlice.actions;

export default accountSlice.reducer;
