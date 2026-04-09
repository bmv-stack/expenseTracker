import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles/GlobalStyles'
import Button from './Button'

const ErrorOverlay = ({ message, onConfirm }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error has occurred!</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
        color: GlobalStyles.colors.white
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})