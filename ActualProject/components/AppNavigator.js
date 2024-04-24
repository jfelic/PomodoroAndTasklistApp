import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PomodoroTimerScreen from './PomodoroTimerScreen';
import TaskListScreen from './TaskListScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName='Pomodoro Timer'>
            <Stack.Screen name="Pomodoro Timer" component={PomodoroTimerScreen} />
            <Stack.Screen name='Tasks' component={TaskListScreen} />
        </Stack.Navigator>
    );
}

export default AppNavigator;