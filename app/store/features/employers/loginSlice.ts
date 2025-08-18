import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginEmployer = createAsyncThunk(
  "employer/loginEmployer",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/employer-login", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

const employerLoginSlice = createSlice({
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
      .addCase(loginEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload.employer || null;
        state.success = action.payload.message || "Login Successful";
      })
      .addCase(loginEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login Failed";
        state.success = null;
      });
  },
});

export const { resetStatus } = employerLoginSlice.actions;
export default employerLoginSlice.reducer;
