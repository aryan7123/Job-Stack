import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const candidateProfileDetails = createAsyncThunk(
  "candidate/profileDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/profile-details", { userId });
      return res.data.profile;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(candidateProfileDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(candidateProfileDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(candidateProfileDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default profileSlice.reducer;
