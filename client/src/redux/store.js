import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './reducer'

const store = configureStore ({
    reducer: {
        articleTransfer: todoReducer
    }
})

export default store