import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
//import { ExpensesContext } from '../store/context/ExpensesContext'
import { useSelector, useDispatch } from "react-redux";

const AllExpensesScreen = () => {
    const expenses = useSelector((state) => state.expensesRed.ids);
    //const expensesCtx = useContext(ExpensesContext)
    return (
        <View style={{ flex: 1 }}>
            <ExpensesOutput expensePeriod='Total' expenses={expenses} fallbackText='No Expenses added yet!' />
        </View>
    )
}

export default AllExpensesScreen

const styles = StyleSheet.create({})