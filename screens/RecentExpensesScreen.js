import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'

const RecentExpensesScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <ExpensesOutput expensePeriod='Last 7 days' />
        </View>
    )
}

export default RecentExpensesScreen

const styles = StyleSheet.create({})