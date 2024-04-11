import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PomodoroTimerScreen from './PomodoroTimerScreen';
import TaskListScreen from './TaskListScreen';
import StatsScreen from './StatsScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName='ScreenA'>
            <Stack.Screen name="PomodoroTimerScreen" component={PomodoroTimerScreen} />
            <Stack.Screen name='TaskListScreen' component={TaskListScreen} />
            <Stack.Screen name='StatsScreen' component={StatsScreen} />
        </Stack.Navigator>
    );
}

export default AppNavigator;