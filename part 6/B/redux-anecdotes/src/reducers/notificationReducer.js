import { createSlice } from '@reduxjs/toolkit'


const initialState = ['Initial Notification']

const notificationSlice = createSlice({

    name:'notification',
    initialState,
    reducers: {
        setNotification (state, action) {
            state[0] = action.payload
        },
        clearNotification (state, action) {
            state[0] = ''
        },
    }
})


export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer