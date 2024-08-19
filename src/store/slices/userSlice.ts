import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  token: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      localStorage.setItem("email", JSON.stringify(action.payload.email));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("id", JSON.stringify(action.payload.id));
    },
    removeUser(state) {
      state.email = "";
      state.token = "";
      state.id = "";
      localStorage.setItem("email", JSON.stringify(""));
      localStorage.setItem("token", JSON.stringify(""));
      localStorage.setItem("id", JSON.stringify(""));
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
