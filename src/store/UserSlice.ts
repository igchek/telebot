import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface TelegramUserPayload {
  initData?: {
    user?: {
      id: number
      firstName: string
      lastName?: string
      username?: string
      [key: string]: unknown
    }
    [key: string]: unknown
  }
  [key: string]: unknown
}

interface UserState {
    data:TelegramUserPayload | null
    isAuthenticated:boolean
}

const initialState:UserState = {
    data:null,
    isAuthenticated:false
}

export const userSlice = createSlice({
    name:'userReducer',
    initialState, 
    reducers:{
        setUser:(state, action:PayloadAction<TelegramUserPayload|null>)=>{
            if(action.payload){
                state.data = action.payload
                state.isAuthenticated = true
            }
            else {
                state.data = action.payload
                state.isAuthenticated =false
            }
        },
    }
})

export default userSlice.reducer

export const {setUser} = userSlice.actions