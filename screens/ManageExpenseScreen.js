import { StyleSheet, Text, View } from "react-native";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles/GlobalStyles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/context/ExpensesContext";

const ManageExpenseScreen = ({ route, navigation }) => {
    const expensesCtx = useContext(ExpensesContext);
    const editExpenseId = route.params?.expenseId;
    const isEditing = !!editExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expensesCtx.deleteExpense(editExpenseId);
        navigation.goBack();
    }
    function cancelHandler() {
        navigation.goBack();
    }
    function confirmHandler() {
        if (isEditing) {
            expensesCtx.updateExpense(editExpenseId, {
                description: "Test!!!",
                amount: 99.99,
                date: new Date("2022-05-08"),
            });
        } else {
            expensesCtx.addExpense({
                description: "Test!!",
                amount: 19.99,
                date: new Date("2022-08-05"),
            });
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
