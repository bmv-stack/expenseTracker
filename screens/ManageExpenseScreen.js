import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles/GlobalStyles";
import { ExpensesContext } from "../store/context/ExpensesContext";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpenseScreen = ({ route, navigation }) => {
    const [error, setError] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    async function deleteExpenseHandler() {
        setIsSubmitting(true)
        try {
            expensesCtx.deleteExpense(editExpenseId);
            await deleteExpense(editExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense')
            isSubmitting(false)
        }
    }
    function cancelHandler() {
        navigation.goBack();
    }
    function errorHandler() {
        setError(null)
    }
    async function confirmHandler(expenseData) {
        setIsSubmitting(true)
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editExpenseId, expenseData);
                await updateExpense(editExpenseId, expenseData);
                setError("Couldn't update the expense")
            } else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError("Couldn't save expense. Please try again later ");
            setIsSubmitting(false)

        }
    }
    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }
    if (isSubmitting) {
        return <LoadingOverlay />
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
