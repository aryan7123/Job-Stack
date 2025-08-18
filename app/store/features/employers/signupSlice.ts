import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerEmployer = createAsyncThunk(
  "employer/registerEmployer",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/employer-signup", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

const employerSlice = createSlice({
  name: "employer",
  initialState: {
    employer: null,
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
      .addCase(registerEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload.employer || null;
        state.success = action.payload.message || "Employer registered successfully";
      })
      .addCase(registerEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to register Employer";
        state.success = null;
      });
  },
});

export const { resetStatus } = employerSlice.actions;
export default employerSlice.reducer;
