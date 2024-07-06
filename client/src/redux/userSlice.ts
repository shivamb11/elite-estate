import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface UserState {
  currentUser: {
    id: string;
    username: string;
    fullname: string;
    email: string;
    avatar?: {
      id: string;
      url: string;
      filename: string;
      public_id: string;
    };
  } | null;
  isFetching: boolean;
  error: string;
}

const initialState: UserState = {
  currentUser: null,
  isFetching: true,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginComplete: (
      state,
      action: PayloadAction<{
        id: string;
        username: string;
        fullname: string;
        email: string;
        avatar?: {
          id: string;
          url: string;
          filename: string;
          public_id: string;
        };
      }>,
    ) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.isFetching = false;
      state.currentUser = null;
    },
    updateStart: (state) => {
      state.isFetching = true;
    },
    updateUser: (
      state,
      action: PayloadAction<{
        id: string;
        username: string;
        fullname: string;
        email: string;
        avatar?: {
          id: string;
          url: string;
          filename: string;
          public_id: string;
        };
      }>,
    ) => {
      state.currentUser = action.payload;
      state.isFetching = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { loginStart, loginComplete, logout, updateStart, updateUser } =
  userSlice.actions;

export default userSlice;
