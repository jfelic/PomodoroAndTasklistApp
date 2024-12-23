import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../colors';
import NavigationBar from './NavigationBar';

const EditTask = ({ route, navigation }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const { task } = route.params;

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [dueDate, setDueDate] = useState(new Date(task.dueDate));

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDueDate(selectedDate);
        }
    };

    const updateTask = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem('tasks');
            let tasks = savedTasks ? JSON.parse(savedTasks) : [];
            const taskIndex = tasks.findIndex(t => t.id === task.id);

            const updatedTask = {
                ...tasks[taskIndex],
                title: title,
                description: description,
                priority: priority,
                dueDate: dueDate.toISOString(),
            };

            tasks[taskIndex] = updatedTask;

            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            navigation.goBack();
        } catch (error) {
            console.error('Failed to update the task:', error);
        }
    };

    const deleteTask = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem('tasks');
            let tasks = savedTasks ? JSON.parse(savedTasks) : [];
            const filteredTasks = tasks.filter(t => t.id !== task.id);

            await AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));
            navigation.goBack();
        } catch (error) {
            console.error('Failed to delete the task:', error);
        }
    };

    return (
        <>
        <View style={editTaskStyles.container}>
            <Text style={editTaskStyles.inputTitle}>Edit Title:</Text>
            <TextInput value={title} onChangeText={setTitle} style={editTaskStyles.input}/>
            
            <Text style={editTaskStyles.inputTitle}>Edit Description:</Text>
            <TextInput value={description} onChangeText={setDescription} style={editTaskStyles.input}/>
            
            <Text style={editTaskStyles.inputTitle}>Edit Priority:</Text>
            <PickerSelect
                onValueChange={(value) => setPriority(value)}
                items={[
                    { label: "High", value: 1 },
                    { label: "Medium", value: 2 },
                    { label: "Low", value: 3 },
                ]}
                value={priority}
                style={editTaskStyles.picker} />

            <Text style={editTaskStyles.inputTitle}>Edit date:</Text>
            <TouchableOpacity 
                style={editTaskStyles.input} 
                onPress={() => setShowDatePicker(true)}
            >
                <Text>{dueDate.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={dueDate}
                    mode="date"
                    onChange={onDateChange}
                />
            )}

            <TouchableOpacity onPress={updateTask} style={editTaskStyles.button}>
                <Text style={editTaskStyles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={deleteTask}  style={editTaskStyles.deleteButton}>
                <Text style={editTaskStyles.buttonText}>Delete Task</Text>
            </TouchableOpacity>
        </View>
        <NavigationBar navigation={navigation}/>
        </>
    );
};

const editTaskStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        fontSize: 18,
        marginBottom: 15,
    },
    button: {
        backgroundColor: colors.green, 
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        marginBottom: 15,
        marginTop: 14,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: colors.red,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        marginBottom: 15,
    },
    picker: {
        inputIOS: {
            fontSize: 18,
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 10,
            color: 'black',
            paddingRight: 30,
            backgroundColor: '#fff',
            marginBottom: 15,
        },
    },
    inputTitle: {
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
    },
});

export default EditTask;