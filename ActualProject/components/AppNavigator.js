import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PomodoroTimerScreen from './PomodoroTimerScreen';
import TaskListScreen from './TaskListScreen';
import EditTask from "./EditTask"; // Make sure the import is correct

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator 
            initialRouteName='Pomodoro Timer' 
            screenOptions={{
                headerBackVisible:false, //Hide the back button in the header
            }}>
                <Stack.Screen name="Tomodoro Timer" component={PomodoroTimerScreen} />
                <Stack.Screen name='Tasks' component={TaskListScreen} />
                <Stack.Screen name='Edit Task' component={EditTask} />
        </Stack.Navigator>
    );
}

export default AppNavigator;
