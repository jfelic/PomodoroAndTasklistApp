import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PomodoroTimer from './PomodoroTimerScreen';
import ScreenB from './TaskListScreen';
import ScreenC from './StatsScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName='ScreenA'>
            <Stack.Screen name="Pomodoro Timer" component={PomodoroTimer} />
            <Stack.Screen name='ScreenB' component={ScreenB} />
            <Stack.Screen name='ScreenC' component={ScreenC} />
        </Stack.Navigator>
    );
}

export default AppNavigator;