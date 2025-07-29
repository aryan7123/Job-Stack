import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/login", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

const userLoginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
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
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.success = action.payload.message || "Login Successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login Failed";
        state.success = null;
      });
  },
});

export const { resetStatus } = userLoginSlice.actions;
export default userLoginSlice.reducer;
