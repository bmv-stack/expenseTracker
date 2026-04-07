import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from './expense-slice'

export const store = configureStore({
    reducer: {
        expensesRed: expensesReducer

    }
})