import { FlatList, StyleSheet, View, Text } from 'react-native'
import ExpenseItem from './ExpenseItem'

function renderItem(itemData) {
    return <ExpenseItem {...itemData.item} />
}

const ExpenseList = ({ expenseList }) => {
    return (
        <View>
            <FlatList
                data={expenseList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id} />
        </View>
    )
}

export default ExpenseList

const styles = StyleSheet.create({})