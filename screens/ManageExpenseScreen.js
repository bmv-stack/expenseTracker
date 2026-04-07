import { StyleSheet, Text, View } from "react-native";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles/GlobalStyles";
import Button from "../components/UI/Button";
//import { ExpensesContext } from "../store/context/ExpensesContext";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense, addExpense, updateExpense } from "../store/redux/expense-slice";

const ManageExpenseScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    //const expensesCtx = useContext(ExpensesContext);
    const editExpenseId = route.params?.expenseId;
    console.log('Route params:', route.params)
    const isEditing = !!editExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        dispatch(deleteExpense(editExpenseId))
        navigation.goBack();
    }
    function cancelHandler() {
        navigation.goBack();
    }
    function confirmHandler() {
        if (isEditing) {
            dispatch(updateExpense({
                id: editExpenseId,
                data: {
                    description: "Updated with Redux!",
                    amount: 99.99,
                    date: new Date("2022-05-08").toString(),
                }
            }))
        } else {
            dispatch(addExpense({
                description: 'Added with Redux',
                amount: 19.99,
                date: new Date("2022-08-05").toString(),
            }))
        }
        navigation.goBack();
    }

    return (
        <View style={styles.conatiner}>
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={confirmHandler}>
                    {isEditing ? "Update" : "Add"}
                </Button>
            </View>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        iconName="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
};

export default ManageExpenseScreen;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },
});
