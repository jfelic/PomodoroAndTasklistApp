import React from 'react';
import { View, Text } from 'react-native';
import NavigationBar from './NavigationBar';
import Timer from './Timer';

export default function PomodoroTimerScreen({navigation}) {
    return (
    <View style={{flex: 1,}}>
        <View style={{flex:1}}>
            <Timer />
        </View>

        <NavigationBar navigation={navigation}/>
    </View>  
    );
}