import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
    text: '',
    isUpdating: '',
    updateItemText: ''
}

export const todoSlice = createSlice({

    name: 'articleSearch',

    initialState,

    reducers: {
        getData: (state, action) => {
            state.value = action.payload
        },
        setItemText: (state, action) => {
            state.text = action.payload
        },
        setIsUpdating: (state, action) => {
            state.isUpdating = action.payload
        },
        setUpdateItemText: (state, action) => {
            state.updateItemText = action.payload
        }
    }
})
export const { getData, setItemText, setIsUpdating, setUpdateItemText } = todoSlice.actions

export default todoSlice.reducer