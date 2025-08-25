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
    initialLoading: true,
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileDetails.pending, (state) => {
        if (!state.employer) {
          state.initialLoading = true;
        }
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileDetails.fulfilled, (state, action) => {
        state.employer = action.payload;
        state.loading = false;
        state.initialLoading = false;
      })
      .addCase(fetchProfileDetails.rejected, (state, action) => {
        state.loading = false;
        state.initialLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { resetStatus } = employerSlice.actions;
export default employerSlice.reducer;