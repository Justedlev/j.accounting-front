import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoginRequest from "../../models/request/LoginRequest";
import { authService } from "../../config/api";
import { isEmpty } from "lodash";
import LoginResponse from "../../models/response/LoginResponse";
import ErrorDetails from "../../models/ErrorDetails";
import { AxiosError } from "axios";
import { ATK, SOMETHING_WENT_WRONG, RTK } from "../../config/app-const";

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
    email: "",
    nickname: "",
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
    authService.login(request).catch((error) => {
      // if (error.status === 401) {
      //   console.log("🚀 ~ file: login-slice.ts ~ line 39 ~ error.status === 401 ~ refresh started");
      //   authService
      //     .refresh(request.refresh)
      //     .catch((error) => thunkApi.rejectWithValue(error.response.data || error));
      // }
      return thunkApi.rejectWithValue(error.response.data || error);
    })
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
        state.response.email = "";
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
        state.response = { ...state.response, ...payload };
        if (!isEmpty(state.response.token.accessToken)) {
          localStorage.setItem(ATK, state.response.token.accessToken);
          localStorage.setItem(RTK, state.response.token.refreshToken);
          state.isLogin = true;
        }
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        localStorage.removeItem(ATK);
				localStorage.removeItem(RTK);
				console.log(localStorage.getItem(ATK))
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
