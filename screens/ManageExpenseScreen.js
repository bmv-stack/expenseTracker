import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles/GlobalStyles";
import { ExpensesContext } from "../store/context/ExpensesContext";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpenseScreen = ({ route, navigation }) => {
    const expensesCtx = useContext(ExpensesContext);
    const editExpenseId = route.params?.expenseId;
    const isEditing = !!editExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editExpenseId
    );

    function deleteExpenseHandler() {
        expensesCtx.deleteExpense(editExpenseId);
        navigation.goBack();
    }
    function cancelHandler() {
        navigation.goBack();
    }
    function confirmHandler(expenseData) {
        if (isEditing) {
            expensesCtx.updateExpense(editExpenseId, expenseData);
        } else {
            expensesCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }

    return (
        <View style={styles.conatiner}>
            <ExpenseForm
                submitButtonLabel={isEditing ? "Update" : "Add"}
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },
});
