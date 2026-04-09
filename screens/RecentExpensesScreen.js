import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/context/ExpensesContext'
import { getDateMinusDays } from '../util/date'
import { fetchExpense } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

const RecentExpensesScreen = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState()
    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpense();
                expensesCtx.setExpense(expenses);
            } catch (error) {
                setError('Could not fetch expenses')
            }
            setIsFetching(false);
        }
        getExpenses();
    }, [])

    function errorHandler() {
        setError(null)
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }
    if (isFetching) {
        return <LoadingOverlay />
    }
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7daysago = getDateMinusDays(today, 7);
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