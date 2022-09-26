import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
    "user/fetch",
   async ()=>{
    
    const response = await axios.get(`http://localhost:3005/user`);
    const Data = await response.data;
    return Data
    }
)


const allSlice = createSlice({
    name : 'Add/user',
    initialState : {
      userDetails :[],
    },
    reducers :{
addPost(state,action){
    const index=  state.userDetails.findIndex(user=>user.id==action.payload.p1)
    console.log(index);
    console.log(action.payload);
// state.userDetails[index].push({...state.userDetails[index],post:[...state.userDetails[index],{...action.payload.p2}]})
// state.userDetails[index].post.push(action.payload.p2)
axios.put(`http://localhost:3005/user/${action.payload.p1}`,action.payload.p2)
//
}
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
    
            state.userDetails = action.payload
        })
    }
})

export default allSlice.reducer
export const {addPost}=allSlice.actions