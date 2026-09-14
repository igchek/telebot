import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface TelegramUserPayload {
  initData?: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      [key: string]: unknown
    }
    [key: string]: unknown
  }
  [key: string]: unknown
}

interface UserData {
    id:number
    first_name:string
    last_name?:string
    username?:string
}

interface UserState {
    data:UserData | null
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
        setUser:(state, action:PayloadAction<UserData|null>)=>{
            if(action.payload){
                
                state.data={
                    id:action.payload.id,
                    first_name:action.payload.first_name,
                    last_name:action.payload.last_name,
                    username:action.payload.username
                }

                state.isAuthenticated = true
            }
            else {
                state.data = null
                state.isAuthenticated =false
            }
        },
    }
})

export default userSlice.reducer

export const {setUser} = userSlice.actions