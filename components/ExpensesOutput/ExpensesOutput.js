import { StyleSheet, Text, View } from 'react-native'
import ExpenseSummary from './ExpenseSummary'
import ExpenseList from './ExpenseList'

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
];

const ExpensesOutput = ({ expenses, expensePeriod }) => {
    return (
        <View>
            <ExpenseSummary periodName={expensePeriod} expenses={DUMMY_EXPENSES} />
            <ExpenseList />
        </View>
    )
}

export default ExpensesOutput

const styles = StyleSheet.create({})