import { StyleSheet, Text, View } from 'react-native'
import ExpenseSummary from './ExpenseSummary'
import ExpenseList from './ExpenseList'
import { GlobalStyles } from '../../constants/styles/GlobalStyles'

const ExpensesOutput = ({ expenses, expensePeriod, fallbackText }) => {
    let content = <Text style={styles.fallbackText}>{fallbackText}</Text>
    if (expenses.length > 0) {
        content = <ExpenseList expenseList={expenses} />
    }
    return (
        <View style={styles.container}>
            <ExpenseSummary periodName={expensePeriod} expenses={expenses} />
            {content}
        </View>
    )
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    fallbackText: {
        color: GlobalStyles.colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 32
    },
})