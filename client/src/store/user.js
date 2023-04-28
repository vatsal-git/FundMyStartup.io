import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "../utils/commonFunctions";

const initialState = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      deleteCookie("token");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const userSelector = (state) => state.user;
const user = userSlice.reducer;
export default user;
