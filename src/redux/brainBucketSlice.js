import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  brainBucket: localStorage.getItem("brainBucket")
    ? JSON.parse(localStorage.getItem("brainBucket"))
    : [],
};

export const brainBucketSlice = createSlice({
  name: "brainBuckets",
  initialState,
  reducers: {
    addToBrainBucket: (state, action) => {
      const bucket = action.payload;

      // Check if a bucket with the same title already exists
      const existingBucket = state.brainBucket.find(
        (b) => b.title === bucket.title
      );

      if (existingBucket) {
        toast("Bucket already created with the same title");
        return;
      }

      // Add the new bucket
      state.brainBucket.push(bucket);
      localStorage.setItem("brainBucket", JSON.stringify(state.brainBucket));
      toast("Bucket created successfully");
    },

    updateToBrainBucket: (state, action) => {
      const bucket = action.payload;
      const index = state.brainBucket.findIndex(
        (item) => item._id === bucket._id
      );

      if (index >= 0) {
        state.brainBucket[index] = bucket;

        localStorage.setItem("brainBucket", JSON.stringify(state.brainBucket));
        toast.success("Bucket updated");
      }
    },
    resetAllBrainBuckets: (state) => {
      state.brainBucket = [];

      localStorage.removeItem("brainBucket");

      toast.success("Reset successfully");
    },
    removeFromBrainBuckets: (state, action) => {
      const bucketId = action.payload;

      console.log(bucketId);
      const index = state.brainBucket.findIndex(
        (item) => item._id === bucketId
      );

      if (index >= 0) {
        state.brainBucket.splice(index, 1);

        localStorage.setItem("brainBucket", JSON.stringify(state.brainBucket));

        toast.success("Bucket Deleted");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToBrainBucket,
  updateToBrainBucket,
  resetAllBrainBuckets,
  removeFromBrainBuckets,
} = brainBucketSlice.actions;

export default brainBucketSlice.reducer;
