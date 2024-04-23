import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, StyleSheet, DatePickerAndroid, Touchable } from 'react-native';
import NavigationBar from './NavigationBar';
import RNPickerSelect from 'react-native-picker-select';



const TaskItem = ({ task, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(task.id)} style={styles.taskItem}>
            <Text style={styles.taskText}>{task.title} - {task.priority} - Due: {task.dueDate.toDateString()}</Text>
            <Text style={styles.taskText}>{task.description}</Text>
        </TouchableOpacity>
    );
};

export default function TaskListScreen({ navigation }) {
    const [tasks, setTasks] = useState([
        { id: '', 
        title: '', 
        description: '', 
        dueDate: new Date(), 
        priority: '', 
        completed: false },
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState(1);
    const [newTaskDueDate, setNewTaskDueDate] = useState(new Date());

    const handlePress = (taskId) => {
        console.log("Pressed task: ", taskId);
    };

    const addTask = () => {
        const newId = tasks.length + 1; // Simple ID generation strategy
        const newTask = {
            id: newId.toString(),
            title: newTaskTitle,
            description: newTaskDescription,
            dueDate: newTaskDueDate,
            priority: newTaskPriority,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setNewTaskTitle('');
        setNewTaskDescription('');
        setNewTaskPriority(1);
        setNewTaskDueDate(new Date());
    };

    const renderTaskInputFields = () => {
        return (
            <View>
                <TextInput
                    placeholder="Title"
                    value={newTaskTitle}
                    onChangeText={setNewTaskTitle}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Description"
                    value={newTaskDescription}
                    onChangeText={setNewTaskDescription}
                    style={styles.input}
                />

                <RNPickerSelect 
                    onValueChange={(value) => setNewTaskPriority(value)}
                    items={[
                        {label: "Low", value: 3},
                        {label: "Medium", value: 2},
                        {label: "High", value: 1},
                    ]}
                    placeholder={{
                        label: '',
                        value: null,
                        color: 'black',
                    }}
                    style={styles.picker}
                />

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
    taskText: {
        fontSize: 18,
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
