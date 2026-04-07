import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'

const AllExpensesScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <ExpensesOutput expensePeriod='Total' />
        </View>
    )
}

export default AllExpensesScreen

const styles = StyleSheet.create({})