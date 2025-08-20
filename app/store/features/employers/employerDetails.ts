import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateEmployerDetails = createAsyncThunk(
  "employer/employerDetails",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/update-employer-details", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

const candidateSlice = createSlice({
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
      .addCase(updateEmployerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload.employer || null;
        state.success = action.payload.message || "Employers Details Updated Successfully";
      })
      .addCase(updateEmployerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update the details";
        state.success = null;
      });
  },
});

export const { resetStatus } = candidateSlice.actions;
export default candidateSlice.reducer;