import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfileDetails = createAsyncThunk(
  "employer/fetchProfileDetails",
  async (employerId: string | undefined, { rejectWithValue }) => {
    try {
      if (!employerId) {
        return rejectWithValue({ message: "Employer ID is required" });
      }

      const res = await axios.post("/api/employer-profile-details", { employerId });
      return res.data.employer;
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
  },
  reducers: {
    resetStatus: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfileDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload;
      })
      .addCase(fetchProfileDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = employerSlice.actions;
export default employerSlice.reducer;