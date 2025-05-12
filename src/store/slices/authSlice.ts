import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  token: null,
  refreshToken: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    logout: (state) => {
      state.userData = null;
      state.token = null;
      state.refreshToken = null;
    }
  }
});

export const { setUserData, setToken, setRefreshToken, logout } = authSlice.actions;
export default authSlice;
