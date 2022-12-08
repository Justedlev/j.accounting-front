import { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../config/api";
import ErrorDetails from "../../models/ErrorDetails";
import { ATK, SOMETHING_WENT_WRONG, RTK } from "../../config/app-const";

export interface LogoutState {
  isLoading: boolean;
  response: {};
  error: string;
}

const initialState: LogoutState = {
  isLoading: false,
  response: {},
  error: "",
};

export const logout = createAsyncThunk<any, void, { rejectValue: AxiosError<ErrorDetails> }>(
  "auth/logout",
  async (_, thunkApi) =>
    authService.logout().catch((error) => thunkApi.rejectWithValue(error.response.data))
);

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    clearLogoutError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
				clearStorage();
        state.error = "";
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        clearStorage();
        state.response = payload;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        clearStorage();
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = SOMETHING_WENT_WRONG;
        }
        state.isLoading = false;
      });
  },
});

function clearStorage(): void {
  localStorage.removeItem(RTK);
  localStorage.removeItem(ATK);
}

export const { clearLogoutError } = logoutSlice.actions;

export default logoutSlice.reducer;
