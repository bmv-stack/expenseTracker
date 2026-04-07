import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        ids: [
            {
                id: "e1",
                description: "A pair of shoes",
                amount: 22.59,
                date: new Date("2021-12-19").toString(),
            },
            {
                id: "e2",
                description: "Football",
                amount: 68.33,
                date: new Date("2021-03-12").toString(),
            },
            {
                id: "e3",
                description: "A book",
                amount: 2.12,
                date: new Date("2021-10-08").toString(),
            },
            {
                id: "e4",
                description: "Some fruits",
                amount: 10.87,
                date: new Date("2021-09-28").toString(),
            },
            {
                id: "e5",
                description: "Mobile Cover",
                amount: 5.41,
                date: new Date("2021-06-26").toString(),
            },
            {
                id: "e6",
                description: "A pair of shoes",
                amount: 22.59,
                date: new Date("2021-12-19").toString(),
            },
            {
                id: "e7",
                description: "Football",
                amount: 68.33,
                date: new Date("2021-03-12").toString(),
            },
            {
                id: "e8",
                description: "A book",
                amount: 2.12,
                date: new Date("2021-10-08").toString(),
            },
            {
                id: "e9",
                description: "Some fruits",
                amount: 10.879,
                date: new Date("2026-04-5").toString(),
            },
            {
                id: "e10",
                description: "Mobile Cover",
                amount: 5.41,
                date: new Date("2021-06-26").toString(),
            },
        ],
    },
    reducers: {
        addExpense: (state, action) => {
            const id = new Date().toString() + Math.random().toString();
            state.ids.unshift({ ...action.payload, id: id })
            console.log('Payload for addExpense', action.payload);
        },
        deleteExpense: (state, action) => {
            state.ids = state.ids.filter((expense) => expense.id !== action.payload)
            console.log('ID for deleteing expense', action.payload)
        },
        updateExpense: (state, action) => {
            const index = state.ids.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state.ids[index]
            const updatedItem = { ...updatableExpense, ...action.payload.data }
            state.ids[index] = updatedItem;

        }
    },
});

export const { addExpense, deleteExpense, updateExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
