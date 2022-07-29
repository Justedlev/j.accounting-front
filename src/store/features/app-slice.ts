import { createSlice } from "@reduxjs/toolkit";
import Translation from "../../models/Translation";

export interface AppState {
  isLoading: boolean;
  isUserLogin: boolean;
  language: "en" | "ru";
  translation: Translation;
}

const initialState: AppState = {
  isLoading: false,
  isUserLogin: false,
  language: "en",
  translation: {},
};

const appSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLanguage: (state, { payload }) => {
      state.language = { ...state, ...payload };
    },
  },
});

export const { setLanguage } = appSlice.actions;

export default appSlice.reducer;
