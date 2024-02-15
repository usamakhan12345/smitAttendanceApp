import { applyMiddleware, createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  userData : {}
}
export const UserLogedIn = createAsyncThunk('Auth/UserLogedIn',async (data)=>{
    try{
      console.log('data in async thunk' , data)
      const res = await  axios({
        method: "post",
        url: "http://192.168.100.67:3000/api/students/login",
        data: {
          ...data,
        },
      })
      // console.log('res for asyna userLogedIn' , res)
      return res.data
    }catch(error){
      console.log("error in async thunk", error)
    }
})



export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    userAuthenticaton : (state,action)=>{
        state.userData = {...action.payload}
    },
  },
    extraReducers: (builder) => {
      builder
      .addCase(UserLogedIn.fulfilled, (state, action) => {
        // console.log('action.payload--->', action.payload);
        state.userData = action.payload;
      })
      .addCase(UserLogedIn.pending, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(UserLogedIn.rejected, (state, action) => {
        state.userData = action.payload;
      });

  },
  
})

export const {  userAuthenticaton } = AuthSlice.actions

export default AuthSlice.reducer