import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles/GlobalStyles";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

const ExpenseForm = ({
    onCancel,
    onSubmit,
    submitButtonLabel,
    defaultValues,
}) => {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : "",
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : "",
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : "",
            isValid: true,
        },
    });

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };
        const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const isDateValid = expenseData.date.toString() !== "Invalid Date";
        const isDescriptionValid = expenseData.description.trim().length > 0;

        if (!isAmountValid || !isDateValid || !isDescriptionValid) {
            // Alert.alert("Invalid Input", "Please check your inputs", [
            //     { text: "Okay", style: "destructive" },
            // ]);
            setInputs((currentInputValues) => {
                return {
                    amount: { value: currentInputValues.amount.value, isValid: isAmountValid },
                    date: { value: currentInputValues.date.value, isValid: isDateValid },
                    description: { value: currentInputValues.description.value, isValid: isDescriptionValid },
                }
            })
            return;
        }
        onSubmit(expenseData);
    }
    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    }
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangeHandler.bind(this, "amount"),
                        value: inputs.amount.value,
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, "date"),
                        value: inputs.date.value,
                    }}
                />
            </View>
            <Input
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, "description"),
                    value: inputs.description.value,
                }}
            />
            {formIsInvalid && <Text style={styles.errorText}>Invalid Value</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={submitHandler}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    );
};

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: GlobalStyles.colors.white,
        marginVertical: 24,
        textAlign: "center",
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
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
});
