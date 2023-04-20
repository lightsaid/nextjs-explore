import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userInfo: {} 
} as any

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getProfile: (state) => {}
    }
})

export const {} = userSlice.actions
export default userSlice.reducer