import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationBar from './NavigationBar';
import Timer from './Timer';

export default function PomodoroTimerScreen({navigation}) {
    return (
    <View style={{flex: 1,}}>

        {/* Timer */}
        <View style={pomodoroStyles.timerContainer}>
            <Timer />
        </View>

        {/* Nav bar */}
        <NavigationBar navigation={navigation}/>
    </View>
    );
}

// Place this with your other style definitions
const pomodoroStyles = StyleSheet.create({
    timerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    timer: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    controlButton: {
        marginHorizontal: 20,
        backgroundColor: '#fefefe',
        padding: 20,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 3,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowColor: '#333',
        shadowOffset: { height: 1, width: 0 },
    },
    controlButtonText: {
        fontSize: 18,
        color: '#333',
    },
    navBar: {
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fefefe',
    },
});

// Now, use these styles in your PomodoroTimerScreen
// Wrap your <Timer /> component with these new styles
