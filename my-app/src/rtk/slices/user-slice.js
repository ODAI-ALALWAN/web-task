import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  API_URL  from "../../services/Api";

// Get all users (admin only)
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API_URL.get("/api/users", {
        withCredentials: true,  
      });
      return data.users || data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    data: [],
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getAllUsers.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload || error.message;
      });
  }
});

export default userSlice.reducer;