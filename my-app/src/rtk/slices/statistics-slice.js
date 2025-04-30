import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  API_URL  from "../../services/Api";


// Get dashboard-summary
export const dashboardSummary = createAsyncThunk(
    "statistic/dashboard-summary",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await API_URL.get("api/statistics/dashboard-summary",  {
          headers: {
            'Cache-Control': 'no-cache', 
          }  
        });
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
);

// Get completed over time
export const completedOverTime = createAsyncThunk(
  "statistic/completed-over-time",
  async (_, { rejectWithValue }) => {
    try {
      
      const { data } = await API_URL.get("api/statistics/completed-over-time",  {
        headers: {
          'Cache-Control': 'no-cache', 
        } 
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Get overdueTask  
export const overdueTask = createAsyncThunk(
    "statistic/overdue",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await API_URL.get("api/statistics/overdue",{
          headers: {
            'Cache-Control': 'no-cache', 
          } 
        });
        console.log(data)
        return data;
      } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
  


export const statisticSlice = createSlice({
    name: "statistic",
    initialState: {
    loader: false,
    data: [],
    completedData: [],
    error: null
  },
  reducers: {
    messageClear: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
          .addCase(dashboardSummary.pending, (state) => {
            state.loader = true;
            state.error = null;
          })
          .addCase(dashboardSummary.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.error = null;
            state.data = payload
          })
          .addCase(dashboardSummary.rejected, (state, { payload, error }) => {
            state.loader = false;
            state.error = payload || error.message;
          })
          .addCase(completedOverTime.pending, (state) => {
            state.loader = true;
            state.error = null;
          })
          .addCase(completedOverTime.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.completedData = payload;
          })
          .addCase(completedOverTime.rejected, (state, { payload, error }) => {
            state.loader = false;
            state.error = payload || error.message;
          })
          .addCase(overdueTask.pending, (state) => {
            state.loader = true;
            state.error = null;
          })
          .addCase(overdueTask.rejected, (state, { payload, error }) => {
            state.loader = false;
            state.error = payload || error.message;
          })
          .addCase(overdueTask.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.completedData = payload;
          })
          
    
    }   
})


export const { messageClear } = statisticSlice.actions;
export default statisticSlice.reducer;