import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const passwordUpdate = createAsyncThunk(
  "candidate/passwordUpdate",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/update-password", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

const passwordSlice = createSlice({
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
      .addCase(passwordUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(passwordUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.candidate = action.payload.candidate || null;
        state.success = action.payload.message || "Password Updated Successfully";
      })
      .addCase(passwordUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update the password";
        state.success = null;
      });
  },
});

export const { resetStatus } = passwordSlice.actions;
export default passwordSlice.reducer;