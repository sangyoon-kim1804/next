import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
    email: "",
    rule: "",
    isLogin: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.id = action.payload.id;
      state.rule = action.payload.rule;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLogin = true;
    },
    clearUser: (state) => {
      state.id = "";
      state.rule = "";
      state.name = "";
      state.email = "";
      state.isLogin = false;
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
