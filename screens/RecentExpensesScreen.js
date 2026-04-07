import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/context/ExpensesContext'
import { getDateMinusDays } from '../util/date'
import { useSelector, useDispatch } from "react-redux";

const RecentExpensesScreen = () => {
    const allExpenses = useSelector((state) => state.expensesRed.ids);
    //const expensesCtx = useContext(ExpensesContext);
    const recentExpenses = allExpenses.filter((expense) => {
        const today = new Date();
        const date7daysago = getDateMinusDays(today, 7);
        const expenseDate = new Date(expense.date)
        return (expense.date >= date7daysago) && (expense.date <= today);
    })
    return (
        <View style={{ flex: 1 }}>
            <ExpensesOutput expensePeriod='Last 7 days' expenses={recentExpenses} fallbackText='No recent expenses yet!' />
        </View>
    )
}

export default RecentExpensesScreen

const styles = StyleSheet.create({})