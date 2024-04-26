import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import NavigationBar from './NavigationBar';
import PickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskItem = ({ task, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(task.id)} style={styles.taskItem}>
            <Text style={styles.taskText}>{task.priority} - {task.title} - Due: {task.dueDate.toDateString()}</Text>
            <Text style={styles.taskText}>{task.description}</Text>
        </TouchableOpacity>
    );
};

export default function TaskListScreen({ navigation }) {
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        const savedTasks = await AsyncStorage.getItem('tasks');
        const tasks = savedTasks ? JSON.parse(savedTasks) : [];
        tasks.forEach(task => {
            task.dueDate = new Date(task.dueDate);
        });
        setTasks(tasks);
    };

    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [])
    );

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState('');
    const [newTaskDueDate, setNewTaskDueDate] = useState(new Date());

    const handlePress = (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            navigation.navigate('Edit Task', { task });
        }
    };

    const addTask = async () => {
        const newId = tasks.length + 1; // Simple ID generation strategy. Won't work once delete is implemented
        const newTask = {
            id: newId,
            title: newTaskTitle,
            description: newTaskDescription,
            dueDate: newTaskDueDate,
            priority: newTaskPriority,
            completed: false,
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

        // Reset input fields after adding a new task
        setNewTaskTitle('');
        setNewTaskDescription('');
        setNewTaskPriority('');
        setNewTaskDueDate(new Date());
    };

    const renderTaskInputFields = () => {
        return (
            <View>
                <Text style={styles.inputTitle}>Title:</Text>
                <TextInput
                    textAlign='center'
                    title="Title:"
                    value={newTaskTitle}
                    onChangeText={setNewTaskTitle}
                    style={styles.input}
                />

                <Text style={styles.inputTitle}>Description:</Text>
                <TextInput
                    textAlign='center'
                    value={newTaskDescription}
                    onChangeText={setNewTaskDescription}
                    style={styles.input}
                />

                <Text style={styles.inputTitle}>Priority:</Text>
                <PickerSelect
                    onValueChange={(value) => setNewTaskPriority(value)}
                    items={[
                        {label: "Low", value: 3},
                        {label: "Medium", value: 2},
                        {label: "High", value: 1},
                    ]}
                    placeholder={{
                        label: 'Choose priority',
                        value: null,
                    }}
                    style={styles.picker}
                />

                <View style={styles.dateContainer}>
                    <Text style={styles.inputTitle}>Choose date: </Text>
                    <DateTimePicker value={newTaskDueDate} onChange={(event, selectedDate) => setNewTaskDueDate(selectedDate || newTaskDueDate)} />
                </View>

                <TouchableOpacity onPress={addTask} style={styles.button}>
                    <Text style={styles.buttonText}>Add Task</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
    <>
        <View style={styles.container}>
            {renderTaskInputFields()}
            <FlatList
                data={tasks}
                renderItem={({ item }) => <TaskItem task={item} onPress={handlePress} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>

        <View>
            <NavigationBar navigation={navigation} />
        </View>
    </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    taskItem: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        elevation: 2,
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowColor: '#333',
        shadowOffset: { height: 3, width: 0 },
    },
    taskText: {
        fontSize: 18,
        color: '#333',
    },
    inputTitle: {
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
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
        inputAndroid: {
            fontSize: 18,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 10,
            color: 'black',
            paddingRight: 30,
            backgroundColor: '#fff',
            marginBottom: 15,
        },
        iconContainer: {
            top: 10,
            right: 15,
        },
        placeholder: {
            color: 'gray',
        },
    },
    button: {
        backgroundColor: '#0275d8',
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItem: 'center',
        justifyContent: 'space-evenly',
    },
    dateText: {

    }
});
