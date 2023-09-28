import { createSlice } from "@reduxjs/toolkit";
import { user } from "../assets/data";

const initialState = {
  user: JSON.parse(window?.localStorage.getItem("user")) ?? {},
  edit: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    updateProfile(state, action) {
      state.edit = action.payload;
    },
  },
});

export default userSlice.reducer;

export function Userlogin(user) {
  // console.log("userUserSlice.....", user);
  return function (dispatch) {
    dispatch(userSlice.actions.login(user));
  };
}

export function Userlogout() {
  return function (dispatch) {
    dispatch(userSlice.actions.logout());
  };
}

export function UpdateProfile(edit) {
  return function (dispatch) {
    dispatch(userSlice.actions.updateProfile(edit));
  };
}
