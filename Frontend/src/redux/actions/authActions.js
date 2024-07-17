import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { info } from "autoprefixer";

export const login = createAction('LOGIN', (info)=>{
    const clearInfo = {
        name: info.firstName + " "+info.lastName,
        email: info.email,
        token: info.token,
        expiresIn: new Date(Date.now() + 1000 * 60 * 60 ).toISOString(),
        loggedIn: true
    }
    return {payload: clearInfo}
})
// export const loginAsync = createAsyncThunk("LOGIN", async (info) => {
    
// try{

//     const response = await axios.post("http://localhost:8080/api/auth/login", info);

//     console.log(response);
//     console.log(response.data);

//     localStorage.setItem('token', response.data);

//     const token = response.data;
//     const responseCurrent = await axios.get("http://localhost:8080/api/auth/current", {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//         });

//     const clearInfo = {
//         status: response.status,
//         name: responseCurrent.data.firstName + " "+responseCurrent.data.lastName,
//         email: info.email,
//         token: token,
//         expiresIn: new Date(Date.now() + 1000 * 60 * 60 ).toISOString(),
//         loggedIn: true
//     }
//     return clearInfo;
// }catch (err) {
//         console.log(err);
//     }
//     }
// )

export const erasedError = createAction('ERASED_ERROR')

export const logout = createAction('LOGOUT')