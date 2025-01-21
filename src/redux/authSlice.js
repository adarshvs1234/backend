import { createSlice }  from '@reduxjs/toolkit'
import { userData } from '../utls/cookiehandle'
// import Sign from '../compoents/Sign'

const initialState ={

    user : userData() || null,
    isAuthenticated : false
}

const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers:{


        login : ((state,action)=> {

            state.user = action.payload
            state.isAuthenticated = true
        }),

        logout : ((state)=>{

                state.user = null
                state.isAuthenticated = false
                
            }),

        signup : ((state,action)=>{
            state.user = action.payload
        }),

        userNameUpdate : ((state,action) =>{

       

                // state.user.name = action.payload
                state.user = action.payload
          
}),

         userPasswordUpdate : ((state,action)=>{

           state.user = action.payload

         })

      
       
    }
})


export const {login,logout,signup,userPasswordUpdate,userNameUpdate}  = authSlice.actions
export default authSlice.reducer


