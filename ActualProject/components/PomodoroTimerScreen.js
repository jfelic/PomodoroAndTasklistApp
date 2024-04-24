import React from 'react';
import { View } from 'react-native';
import NavigationBar from './NavigationBar';
import Timer from './Timer';

export default function PomodoroTimerScreen({navigation}) {
    return (
    <View style={{flex: 1,}}>

        {/* Timer */}
        <View style={{flex:1}}>
            <Timer />
        </View>

        {/* Nav bar */}
        <NavigationBar navigation={navigation}/>
    </View>
    );
}