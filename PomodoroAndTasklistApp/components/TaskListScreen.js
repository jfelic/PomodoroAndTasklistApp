import React from 'react';
import { View, Text } from 'react-native';
import NavigationBar from './NavigationBar';

export default function TaskListScreen({navigation}) {
    return (
        <View>
            <NavigationBar navigation={navigation} />
        </View>
    );
}