import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function NavigationBar( {navigation} ) {
    return (
        <View style={style.navContainer}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Tomodoro Timer')}
                style={style.button}>
                    <Text style={style.buttonText}>Timer</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => navigation.navigate('Tasks')}
                style={style.button}>
                    <Text style={style.buttonText}>Tasks</Text>
            </TouchableOpacity>

        </View>
    );
}

const style = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: "flex-end",
        backgroundColor: 'white', // A light grey background
        paddingBottom: 20, // Space from the bottom
        paddingTop: 10, // Space from the top
        shadowOpacity: 0.1, // Optional: Shadow for iOS
        shadowRadius: 3,
        shadowOffset: { height: -3 },
        elevation: 20, // Optional: Shadow for Android
    },
    button: {
        backgroundColor: '#ffffff', // White background for the buttons
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20, // Rounded corners
        shadowOpacity: 0.3, // Optional: Shadow for iOS
        shadowRadius: 3,
        shadowOffset: { height: 3 },
        elevation: 6, // Optional: Shadow for Android
    },
    buttonText: {
        fontSize: 16, // Adjust the size as needed
        color: '#333333', // Dark grey color for the text
    },
    });