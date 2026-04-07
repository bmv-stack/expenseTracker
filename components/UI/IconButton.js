import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const IconButton = ({ iconName, size, color, onPress }) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed ? styles.pressed : null}>
            <View style={styles.button}>
                <Ionicons name={iconName} size={size} color={color} />
            </View>
        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed: {
        opacity: 0.25
    }
})