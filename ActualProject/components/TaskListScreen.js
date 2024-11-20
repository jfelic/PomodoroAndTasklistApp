import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import NavigationBar from './NavigationBar';
import PickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../colors';

const priorityColors = {
   1: colors.red, // High
   2: colors.orange, // Medium
   3: colors.green, // Low
};

const TaskItem = ({ task, onPress }) => {
   const borderColor = priorityColors[task.priority] || colors.red;

   return (
       <TouchableOpacity onPress={() => onPress(task.id)} style={[styles.taskItem, { borderColor }]}>
           <Text style={styles.taskText}>{task.priority} - {task.title}</Text>
           <Text style={styles.taskText}>Due: {task.dueDate.toDateString()}</Text>
           <Text style={styles.taskText}>{task.description}</Text>
       </TouchableOpacity>
   );
};

export default function TaskListScreen({ navigation }) {
   const [tasks, setTasks] = useState([]);
   const [showDatePicker, setShowDatePicker] = useState(false);

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

   const onDateChange = (event, selectedDate) => {
       setShowDatePicker(false);
       if (selectedDate) {
           setNewTaskDueDate(selectedDate);
       }
   };

   const addTask = async () => {
       const newId = tasks.length + 1;
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

       setNewTaskTitle('');
       setNewTaskDescription('');
       setNewTaskPriority('');
       setNewTaskDueDate(new Date());
   };

   return (
       <>
       <View style={styles.container}>
           <FlatList
               data={tasks}
               renderItem={({ item }) => <TaskItem task={item} onPress={handlePress} />}
               keyExtractor={item => item.id.toString()}
           />

           <View style={styles.inputContainer}>
               <Text style={styles.inputTitle}>Title:</Text>
               <TextInput
                   style={styles.input}
                   value={newTaskTitle}
                   onChangeText={setNewTaskTitle}
                   placeholder="Enter title"
               />
               <Text style={styles.inputTitle}>Description:</Text>
               <TextInput
                   style={styles.input}
                   value={newTaskDescription}
                   onChangeText={setNewTaskDescription}
                   placeholder="Enter description"
               />
               <Text style={styles.inputTitle}>Priority:</Text>
               <PickerSelect
                   onValueChange={setNewTaskPriority}
                   items={[
                       { label: "High", value: "1" },
                       { label: "Medium", value: "2" },
                       { label: "Low", value: "3" },
                   ]}
                   style={styles.picker}
               />
               <Text style={styles.inputTitle}>Due Date:</Text>
               <TouchableOpacity 
                   style={styles.input} 
                   onPress={() => setShowDatePicker(true)}
               >
                   <Text>{newTaskDueDate.toDateString()}</Text>
               </TouchableOpacity>
               {showDatePicker && (
                   <DateTimePicker
                       value={newTaskDueDate}
                       onChange={onDateChange}
                       mode="date"
                   />
               )}
               <TouchableOpacity onPress={addTask} style={styles.button}>
                   <Text style={styles.buttonText}>Add Task</Text>
               </TouchableOpacity>
           </View>
       </View>
       <NavigationBar navigation={navigation} />
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
       padding: 5,
       borderWidth: 1.35,
       borderRadius: 10,
       marginVertical: 10,
       marginHorizontal: 10,
       elevation: 2,
       shadowOpacity: 0.1,
       shadowRadius: 3,
       shadowColor: '#333',
       shadowOffset: { height: 3, width: 0 },
       backgroundColor: 'white'
   },
   taskText: {
       fontSize: 18,
       color: 'black',
   },
   inputTitle: {
       fontSize: 18,
       color: '#333',
       marginBottom: 10,
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
   },
   button: {
       backgroundColor: colors.green,
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
});