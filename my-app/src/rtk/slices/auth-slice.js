import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API_URL from "../../services/Api";




export const auth_login = createAsyncThunk ( 'auth/auth_login' , async (info , {rejectWithValue , fulfillWithValue}) => {
    try{
        const { data }   = await API_URL.post('api/auth/login' , info , { withCredentials : true})
        return fulfillWithValue(data)
    }catch (error){
        return rejectWithValue(error.response.data.message)
    }
})

export const auth_logout = createAsyncThunk('auth/auth_logout', async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await API_URL.post('api/auth/logout', {}, { withCredentials: true });
        return fulfillWithValue(data);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
});


export const authSlice = createSlice({    
    name : "auth",
    initialState: {
        successMessage : '',
        errorMessage : '',
        loader : false ,  
        isLogin : false ,      
        role : '',
        userName : '',
        userId : ' ',
    },
    reducers:{
        messageClear : (state) => {
            state.errorMessage = ''
            state.successMessage = ''
        },
    },
    extraReducers : (builder) => {
        builder.addCase(auth_login.pending , (state) => {
            state.loader = true
        })
        .addCase(auth_login.rejected , (state , { payload }) => {
            state.loader = false
            state.errorMessage = payload 
        })
        .addCase(auth_login.fulfilled , (state , { payload }) => {
            const { message,  user } = payload;
            const { role, username, id } = user;
            state.isLogin = true;
            state.loader = false;
            state.successMessage = message;
            state.role = role;
            state.userName = username;
            state.userId = id;
        })
        .addCase(auth_logout.fulfilled, (state, { payload }) => {
            state.isLogin = false;
            state.userId = '';
            state.role = '';
            state.userName = '';
            state.successMessage = payload.message;
        });

    }
})

export const { messageClear } = authSlice.actions

export default authSlice.reducer