import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { name: null, id: null },
  reducers: {
    setUser: (state, action) => action.payload,
    removeUser: (state) => ({ name: null, id: null }),
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
