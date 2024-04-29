import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';
import NavigationBar from './NavigationBar';
import Timer from './Timer';
import colors from '../colors'; // Import your color scheme here
import TomatoIndicator from '../components/TomatoIndicator';

export default function PomodoroTimerScreen({ navigation }) {
    const [workMinutes, setWorkMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [totalSessions, setTotalSessions] = useState(4);
    const [completedSessions, setCompletedSessions] = useState(0);

    const completeWorkSession = useCallback(() => {
        setCompletedSessions((prev) => prev + 1);
    }, []);

    useEffect(() => {
        if (completedSessions === totalSessions) {
            setCompletedSessions(0); // Reset sessions
        }
    }, [completedSessions, totalSessions]);

    const handleWorkMinutesChange = (text) => {
        const minutes = text ? parseInt(text, 10) : '';
        setWorkMinutes(minutes);
    };

    const handleBreakMinutesChange = (text) => {
        const minutes = text ? parseInt(text, 10) : '';
        setBreakMinutes(minutes);
    };

    return (
        <View style={styles.container}>
            <TomatoIndicator
                totalSessions={totalSessions}
                completedSessions={completedSessions}
            />

            <View style={styles.timerContainer}>
                <Timer
                    workSessionLength={workMinutes * 60}
                    breakSessionLength={breakMinutes * 60}
                    onCompleteWorkSession={completeWorkSession}
                />
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Work Minutes:</Text>
                    <TextInput
                        style={styles.input}
                        value={workMinutes.toString()}
                        onChangeText={handleWorkMinutesChange}
                        keyboardType="number-pad"
                        placeholder="25"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Break Minutes:</Text>
                    <TextInput
                        style={styles.input}
                        value={breakMinutes.toString()}
                        onChangeText={handleBreakMinutesChange}
                        keyboardType="number-pad"
                        placeholder="5"
                    />
                </View>
            </View>

            <NavigationBar navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    timerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: colors.red,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // iOS Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        // Android Shadow
        elevation: 5,
    },
    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC', // Light gray border
        padding: 10,
        flex: 1,
        marginLeft: 10,
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 5,
        backgroundColor: '#FFF', // White background
    },
    label: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
});
