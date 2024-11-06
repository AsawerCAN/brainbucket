import { configureStore } from "@reduxjs/toolkit";
import brainBucketReducer from "./brainBucketSlice";

export const store = configureStore({
  reducer: {
    brainBuckets: brainBucketReducer,
  },
});
