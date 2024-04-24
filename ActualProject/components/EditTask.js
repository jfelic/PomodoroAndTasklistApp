import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTask = ({ route, navigation }) => {
    const { task } = route.params;

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [dueDate, setDueDate] = useState(new Date(task.dueDate));

    const updateTask = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem('tasks');
            let tasks = savedTasks ? JSON.parse(savedTasks) : [];
            const taskIndex = tasks.findIndex(t => t.id === task.id);

            // Update task details
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
            navigation.goBack();  // Navigate back after deleting
        } catch (error) {
            console.error('Failed to delete the task:', error);
        }
    };


    return (
        <View style={editTaskStyles.container}>
            <TextInput value={title} onChangeText={setTitle} style={editTaskStyles.input}/>
            <TextInput value={description} onChangeText={setDescription} style={editTaskStyles.input}/>
            <TouchableOpacity onPress={updateTask} style={editTaskStyles.button}>
                <Text style={editTaskStyles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteTask}  style={editTaskStyles.deleteButton}>
                <Text style={editTaskStyles.buttonText}>Delete Task</Text>
            </TouchableOpacity>
        </View>
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
        backgroundColor: '#5cb85c', // Bootstrap's 'btn-success' color
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#d9534f', // Bootstrap's 'btn-danger' color
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        marginBottom: 15,
    },
});

export default EditTask;
