import { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../config/api";
import SignupRequest from "../../models/request/SignupRequest";
import ErrorDetails from "../../models/ErrorDetails";
import { SOMETHING_WENT_WRONG } from "../../config/app-const";

export interface SignupState {
  isLoading: boolean;
  error: string;
}

const initialState: SignupState = {
  isLoading: false,
  error: "",
};

export const signup = createAsyncThunk<any, SignupRequest, { rejectValue: AxiosError<ErrorDetails> }>(
  "auth/signup",
  async (request, thunkApi) =>
    authService.signup(request).catch((error) => thunkApi.rejectWithValue(error.response.data))
);

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    clearErrorMessage: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = SOMETHING_WENT_WRONG;
        }
      });
  },
});

export const { clearErrorMessage } = signupSlice.actions;

export default signupSlice.reducer;
