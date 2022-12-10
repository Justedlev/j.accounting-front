import { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoginRequest from "../../models/request/LoginRequest";
import { authService } from "../../config/api";
import LoginResponse from "../../models/response/LoginResponse";
import ErrorDetails from "../../models/ErrorDetails";
import { ATK, SOMETHING_WENT_WRONG, RTK } from "../../config/app-const";
import { decodeToken } from "react-jwt";

export interface LoginState {
  isLoading: boolean;
  isLogin: boolean;
  response: LoginResponse;
  error: string;
}

const atk = localStorage.getItem(ATK);
const rtk = localStorage.getItem(RTK);

const initialState: LoginState = {
  isLoading: false,
  isLogin: false,
  response: {
    nickname: decodeToken<{sub: string}>(atk || "")?.sub || "",
    token: {
      accessToken: atk || "",
      refreshToken: rtk || "",
    },
  },
  error: "",
};

export const login = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: AxiosError<ErrorDetails> }>(
  "auth/login",
  async (request, thunkApi) =>
    authService.login(request).catch((error) => thunkApi.rejectWithValue(error.response.data || error))
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginResponseState(state, { payload }) {
      state.response = { ...state.response, ...payload };
    },
    refresh(state, { payload }) {
      state.response.token = { ...state.response.token, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.response.nickname = "";
        state.isLogin = false;
        state.response.token = {
          accessToken: "",
          refreshToken: "",
        };
        state.error = "";
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.response.token = { ...state.response.token, ...payload };
        state.response.nickname = decodeToken<{sub: string}>(state.response.token.accessToken)?.sub || "";
        localStorage.setItem(ATK, state.response.token.accessToken);
        localStorage.setItem(RTK, state.response.token.refreshToken);
        state.isLogin = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = SOMETHING_WENT_WRONG;
        }
        state.isLoading = false;
      });
  },
});

export const { setLoginResponseState } = loginSlice.actions;

export default loginSlice.reducer;
