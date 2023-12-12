import { createSlice } from "@reduxjs/toolkit";

const initialSentState = {
  sender: "",
  subject: "",
  message: "",
};

const sentAlice = createSlice({
  name: "sent",
  initialState: initialSentState,
  reducers: {
    addToSent(state, action) {},
  },
});
