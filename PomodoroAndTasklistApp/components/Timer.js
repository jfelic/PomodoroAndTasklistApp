import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing MaterialIcons

const Timer = () => {
    const [secondsLeft, setSecondsLeft] = useState(1500); // Default Pomodoro time set to 25min
    const [isActive, setIsActive] = useState(false);
    const [timerInterval, setTimerInterval] = useState(null);

    useEffect(() => {
        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    }, [timerInterval]);

    const startTimer = () => {
        if (!isActive && !timerInterval) {
            const interval = setInterval(() => {
                setSecondsLeft(seconds => seconds - 1);
            }, 1000);
            setTimerInterval(interval);
            setIsActive(true);
        }
    };

    const pauseTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            setTimerInterval(null);
            setIsActive(false);
        }
    };

    const resetTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            setTimerInterval(null);
        }
        setSecondsLeft(1500); // Reset to 25 minutes
        setIsActive(false);
    };

    const formatTime = () => {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>{formatTime()}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={startTimer}>
                    <Icon name="play-arrow" size={30} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={pauseTimer}>
                    <Icon name="pause" size={30} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={resetTimer}>
                    <Icon name="refresh" size={30} color="#FFF" />
                </TouchableOpacity>
            </View>
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
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        marginHorizontal: 10,
        backgroundColor: '#007AFF', // iOS blue button color
        width: 50, // Circular button
        height: 50, // Circular button
        borderRadius: 25, // Half of the width and height to make it circular
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Timer;
