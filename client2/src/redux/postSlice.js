import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  acceptButton: "",
  denyButton: "",
  disable: false,
  value: "",
  buttonID: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
    setAcceptButton(state, action) {
      state.acceptButton = action.payload;
    },

    setDenyButton(state, action) {
      state.denyButton = action.payload;
    },
    setDisable(state, action) {
      state.disable = action.payload;
    },
    setValue(state, action) {
      state.value = action.payload;
    },
    setButtonValue(state, action) {
      state.buttonID = action.payload;
    },
  },
});
export function setPosts(posts) {
  return function (dispatch) {
    dispatch(postSlice.actions.getPosts(posts));
  };
}
export default postSlice.reducer;

export const {
  setAcceptButton,
  setDisable,
  setDenyButton,
  setValue,
  setButtonValue,
} = postSlice.actions;
