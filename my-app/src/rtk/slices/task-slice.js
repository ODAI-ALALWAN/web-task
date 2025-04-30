import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  API_URL  from "../../services/Api";
import { normalizeTask } from "../../utils/helpers";

// Get All Tasks
export const getAllTasks = createAsyncThunk(
  "task/getAllTasks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API_URL.get("api/tasks", {
        withCredentials: true,  
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add Task
export const addTask = createAsyncThunk(
    "task/addTask",
    async (taskData, { rejectWithValue }) => {
      try {
        const { data } = await API_URL.post("/api/tasks", taskData, {
          withCredentials: true,  
        });
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );


// Update Task (only status or fields passed)
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await API_URL.put(`api/tasks/${id}`, updatedData, {
        withCredentials: true,  
      });
      return { id, raw: data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete Task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await API_URL.delete(`api/tasks/${id}`, {
        withCredentials: true,  
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const taskSlice = createSlice({
  name: "task",
  initialState: {
    loader: false,
    data: [],
    error: null
  },
  reducers: {
    messageClear: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, { payload }) => {
        state.loader = false;
        // backend may return array directly or under data/tasks
        const rawList = payload.data || payload.tasks || payload;
        state.data = rawList.map(normalizeTask);
      })
      .addCase(getAllTasks.rejected, (state, { payload, error }) => {
        state.loader = false;
        state.error = payload || error.message;
      })


      .addCase(addTask.pending, (state) => {
        state.loader = true;
      })
      .addCase(addTask.fulfilled, (state, { payload }) => {
        state.loader = false;
        const raw = payload.data || payload.task || payload;
        state.data.push(normalizeTask(raw));
      })
      .addCase(addTask.rejected, (state, { payload, error }) => {
        state.loader = false;
        state.error = payload || error.message;
      })


      .addCase(updateTask.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.loader = false;
        const idx = state.data.findIndex(t => t.id === payload.id);
        if (idx !== -1) {
          const raw = payload.raw.data || payload.raw.task || payload.raw;
          state.data[idx] = normalizeTask(raw);
        }
      })
      .addCase(updateTask.rejected, (state, { payload, error }) => {
        state.loader = false;
        state.error = payload || error.message;
      })


      .addCase(deleteTask.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.data = state.data.filter(t => t.id !== payload);
      })
      .addCase(deleteTask.rejected, (state, { payload, error }) => {
        state.loader = false;
        state.error = payload || error.message;
      });
  }
});

export const { messageClear } = taskSlice.actions;
export default taskSlice.reducer;
