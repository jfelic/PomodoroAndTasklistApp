import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PomodoroTimerScreen from './PomodoroTimerScreen';
import TaskListScreen from './TaskListScreen';
import StatsScreen from './StatsScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName='ScreenA'>
            <Stack.Screen name="Pomodoro Timer" component={PomodoroTimerScreen} />
            <Stack.Screen name='Tasks' component={TaskListScreen} />
            <Stack.Screen name='Statistics' component={StatsScreen} />
        </Stack.Navigator>
    );
}

export default AppNavigator;