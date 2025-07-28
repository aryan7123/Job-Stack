import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/signup", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to register user";
      });
    },
});

export default userSlice.reducer;
