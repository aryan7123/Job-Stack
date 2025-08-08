import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const candidateSocialLinks = createAsyncThunk(
  "candidate/socialLinks",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/social-links", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

const candidateSlice = createSlice({
  name: "candidate",
  initialState: {
    candidate: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(candidateSocialLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(candidateSocialLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.candidate = action.payload.candidate || null;
        state.success = action.payload.message || "Social Links Updated Successfully";
      })
      .addCase(candidateSocialLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update the details";
        state.success = null;
      });
  },
});

export const { resetStatus } = candidateSlice.actions;
export default candidateSlice.reducer;