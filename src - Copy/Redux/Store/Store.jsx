import { configureStore } from "@reduxjs/toolkit";
import allSlice from "../Slice/allSlice";
export const Store = configureStore({
  reducer: {
    all_slice: allSlice,
  },
});
