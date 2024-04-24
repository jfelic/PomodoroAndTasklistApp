import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    // Load tasks from AsyncStorage when the component mounts
    useEffect(() => {
        const loadTasks = async () => {
            const savedTasks = await AsyncStorage.getItem('tasks');
            const tasks = savedTasks ? JSON.parse(savedTasks) : [];
            // Convert string dates back to Date objects
            tasks.forEach(task => {
                task.dueDate = new Date(task.dueDate);
            });
            setTasks(tasks);
        };

        loadTasks();
    }, []);

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState('');
    const [newTaskDueDate, setNewTaskDueDate] = useState(new Date());

    const handlePress = (taskId) => {
        console.log("Pressed task: ", taskId);
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

        //Reset input fields after adding a new task
        setNewTaskTitle('');
        setNewTaskDescription('');
        setNewTaskPriority('');
        setNewTaskDueDate(new Date());
    };

    const renderTaskInputFields = () => {
        return (
            <View>

                {/* Title input */}
                <Text style={styles.inputTitle}>Title:</Text>
                <TextInput
                    textAlign='center'
                    title="Title:"
                    value={newTaskTitle}
                    onChangeText={setNewTaskTitle}
                    style={styles.input}
                />

                {/* Description Input */}
                <Text style={styles.inputTitle}>Description:</Text>
                <TextInput
                    textAlign='center'
                    value={newTaskDescription}
                    onChangeText={setNewTaskDescription}
                    style={styles.input}
                />

                {/* Priority Selection */}
                <Text style={styles.inputTitle}>Priority:</Text>
                <PickerSelect
                    onValueChange={(value) => setNewTaskPriority(value)}
                    items={[
                        {label: "Low", value: 3},
                        {label: "Medium", value: 2},
                        {label: "High", value: 1},
                    ]}
                    placeholder={{
                        label: '',
                        value: null,
                    }}
                    style={styles.picker}
                />

                {/* Due Date */}
                <DateTimePicker value={new Date()} />

                {/* Add Task Button */}
                <TouchableOpacity onPress={addTask}>
                    <Text style={styles.button}>Add Task</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderTaskInputFields()}
            <FlatList
                data={tasks}
                renderItem={({ item }) => <TaskItem task={item} onPress={handlePress} />}
                keyExtractor={item => item.id}
            />
            <NavigationBar navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    taskItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    inputTitle: {
        fontSize: 18,
        marginLeft: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 20,
        borderRadius: 5,
        alignItems: 'center',
        color: "white",
        textAlign: 'center',
    },
    picker: {
        inputIOS: {
            fontSize: 16,
            padding: 10,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 5,
            color: 'black',
            paddingRight: 30,
            margin: 10,
        },
        inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'purple',
            borderRadius: 8,
            color: 'black',
            paddingRight: 30,
            margin: 10,
        },
    },
});
