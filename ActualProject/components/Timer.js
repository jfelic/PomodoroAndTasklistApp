import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../colors';

const Timer = ({ workSessionLength, breakSessionLength, onCompleteWorkSession }) => {
    const [secondsLeft, setSecondsLeft] = useState(workSessionLength);
    const [isActive, setIsActive] = useState(false);
    const [isWorkSession, setIsWorkSession] = useState(true);

    useEffect(() => {
        let interval = null;

        if (isActive && secondsLeft > 0) {
            interval = setInterval(() => {
                setSecondsLeft((seconds) => seconds - 1);
            }, 1000);
        } else if (isActive && secondsLeft === 0) {
            clearInterval(interval);
            // Toggle session type and call onCompleteWorkSession if it was a work session
            if (isWorkSession) {
                onCompleteWorkSession();
            }
            setIsWorkSession(!isWorkSession);
            setSecondsLeft(isWorkSession ? breakSessionLength : workSessionLength);
        }

        return () => clearInterval(interval);
    }, [isActive, secondsLeft, isWorkSession, workSessionLength, breakSessionLength, onCompleteWorkSession]);

    const handleStartPause = () => {
        setIsActive(!isActive);
    };

    const handleReset = () => {
        setIsActive(false);
        setIsWorkSession(true);
        setSecondsLeft(workSessionLength);
    };

    const formatTime = () => {
        let minutes = Math.floor(secondsLeft / 60);
        let seconds = secondsLeft % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>{formatTime()}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleStartPause}>
                    <Icon name={isActive ? "pause" : "play-arrow"} size={30} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleReset}>
                    <Icon name="refresh" size={30} color="#FFF" />
                </TouchableOpacity>
            </View>
            <Text style={styles.sessionText}>{isWorkSession ? 'Work' : 'Break'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    timerText: {
        fontSize: 48,
        color: 'black', // Using red color for the timer text
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        marginHorizontal: 10,
        backgroundColor: colors.red, // Use the red color variable for the buttons
        width: 50, // Circular button
        height: 50, // Circular button
        borderRadius: 25, // Half of the width and height to make it circular
        alignItems: 'center',
        justifyContent: 'center',
    },
    sessionText: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black', // Using red color for the session text
    },
});

export default Timer;
