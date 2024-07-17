import { createReducer } from "@reduxjs/toolkit";
import { erasedError, login, logout } from "../actions/authActions";

const initialState = {
  loggedIn: false,
  status: 0, // 0: pending, 200: fulfilled, 404: rejected
  token: "",
  error:"",
  user: {
    name: "",
    email: ""
  }
}

const authReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(login, (state, action) => {
    return {
      ...state,
      user:{
        name: action.payload.name,
        email: action.payload.email
     },
     status: action.payload.status,
     token: action.payload.token,
     loggedIn: action.payload.loggedIn,   
     expiresIn: action.payload.expiresIn
    }
  })
    // .addCase(loginAsync.fulfilled, (state, action) => {
    //     console.log('fulfilled');
    //     return{
    //      ...state,
    //      user:{
    //         name: action.payload.name,
    //         email: action.payload.email
    //      },
    //      status: action.payload.status,
    //      token: action.payload.token,
    //      loggedIn: action.payload.loggedIn,   
    //      expiresIn: action.payload.expiresIn
    //     }})
    //     .addCase(loginAsync.pending, (state, action) => {
    //         console.log('pending');
    //         return {
    //             ...state,
    //             error: "",
    //             status: 0
    //         }
    //     })
    //     .addCase(loginAsync.rejected, (state, action) => {
    //         console.log('rejected');
    //         return {
    //             ...state,
    //             error: "Error during login",
    //             status: 404
    //         }
    //     })
    .addCase(logout, (state, action) => {
        return initialState
    })
    .addCase(erasedError, (state, action) => {
        return {
            ...state,
            error: "",
            status: 0
        }
    })
});

export default authReducer;
