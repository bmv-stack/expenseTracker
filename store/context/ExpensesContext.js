import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 22.59,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'Football',
        amount: 68.33,
        date: new Date('2021-03-12')
    },
    {
        id: 'e3',
        description: 'A book',
        amount: 2.12,
        date: new Date('2021-10-08')
    },
    {
        id: 'e4',
        description: 'Some fruits',
        amount: 10.87,
        date: new Date('2021-09-28')
    },
    {
        id: 'e5',
        description: 'Mobile Cover',
        amount: 5.41,
        date: new Date('2021-06-26')
    },
    {
        id: 'e6',
        description: 'A pair of shoes',
        amount: 22.59,
        date: new Date('2021-12-19')
    },
    {
        id: 'e7',
        description: 'Football',
        amount: 68.33,
        date: new Date('2021-03-12')
    },
    {
        id: 'e8',
        description: 'A book',
        amount: 2.12,
        date: new Date('2021-10-08')
    },
    {
        id: 'e9',
        description: 'Some fruits',
        amount: 10.879,
        date: new Date('2026-04-5')
    },
    {
        id: 'e10',
        description: 'Mobile Cover',
        amount: 5.41,
        date: new Date('2021-06-26')
    },
];


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { }
}
);
function expensesReducer(state, action) {
    switch (action.type) {

        case 'ADD':

            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state]

        case 'UPDATE':

            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex]
            const updatedItem = { ...updatableExpense, ...action.payload.data }
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;

        case 'DELETE':

            return state.filter((expense) => expense.id !== action.payload);

        default:

            return state
    }
}
function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });

    }
    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id })
    }
    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
    }
    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>

}

export default ExpensesContextProvider;