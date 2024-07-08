import  {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios  from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = createAsyncThunk('user/login', async (postData,{rejectWithValue}) => {
    try{
        const response = await axios.post(`${API_URL}/user/login`, postData);
        return response.data;
    }catch(error){
        console.log(error);
        if(error.response){
            return rejectWithValue(error.response.data)
        }else if(error.request) {
            return rejectWithValue('Network error: No response received')
        }else {
            return rejectWithValue(error.message)
        }
       
    }
})

export const authUser = createAsyncThunk('user/auth-user/detais',async(token,{rejectWithValue})=> {
    try{
        const response = await axios.get(`${API_URL}/user/auth-user/details`,{
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
        return response.data;

    }catch(error){
        const refreshToken = localStorage.getItem('refreshToken');
        try{

            const response = await axios.get(`${API_URL}/user/refresh-token/details`,{
                headers:{
                    Authorization : `Bearer ${refreshToken}`
                }
            })
            return rejectWithValue(response.data);
        }catch(error){
            return rejectWithValue(error.response.data.message);
        }
    }
})

const initialState = {
    isLoading:false,
    isAuth:(localStorage.getItem('token')) ? true : false,
    user:'',
    token:localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    message:'',
    error:''
}

const loginSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        clearMessage:(state) =>{
            state.message = ''
        },
        clearError:(state) => {
            state.error = '';
        },
        logout:(state) => {
            state.isAuth = false;
            state.user =[];
            state.token = '';
            state.refreshToken = '';
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        }
    },
    extraReducers:(builder) => {
        builder.addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(loginUser.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload.authUser;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.message = action.payload.message;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        })
        builder.addCase(loginUser.rejected,(state,action) => {

            state.isLoading = false;
            state.error = action.payload.message;
        })

        builder.addCase(authUser.pending,(state)=> {
            state.isLoading = true;
        })

        builder.addCase(authUser.fulfilled,(state,action) => {
            state.isLoading =  false;
            state.user = action.payload.authUser;
        })

        builder.addCase(authUser.rejected,(state,action) => {
            if(action.payload.authUser){
                state.isLoading = false;
                state.user = action.payload.authUser;
                state.isAuth = true;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                localStorage.setItem('token',action.payload.token);
                localStorage.setItem('refreshToken',action.payload.refreshToken);
            }else {
                state.isLoading = false;
                state.isAuth = false;
                state.user = [];
                state.token = '';
                state.refreshToken = '';
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            }
        })
    }
})
const {actions, reducer} = loginSlice;
export default reducer;
export const {clearMessage, clearError, logout} = actions;
