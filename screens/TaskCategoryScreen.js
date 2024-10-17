import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Alert, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import AppLoading from 'expo-app-loading';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import EditTaskModal from '../components/EditTaskModal';
import AddTaskModal from '../components/AddTaskModal';
import styles from '../styles';

import { initializeDatabase, getTasksByCategory, addTask, updateTask, deleteTask } from '../database/database';

const TaskCategoryScreen = ({ route }) => {
    const { category } = route.params;
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [editTaskVisible, setEditTaskVisible] = useState(false);
    const [addTaskVisible, setAddTaskVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [newTask, setNewTask] = useState({ name: '', description: '', category });
    const [fontsLoaded] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
      });
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    useEffect(() => {
        initializeDatabase();
        loadTasks();
    }, []);

    const loadTasks = () => {
        getTasksByCategory(
            category,
            (tasks) => setFilteredTasks(tasks),
            (error) => console.error('Error loading tasks:', error)
        );
    };

    const handleDeleteTask = (taskId) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel',style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: () => {
                        deleteTask(
                            taskId,
                            () => loadTasks(),
                            (error) => console.error('Error deleting task:', error)
                        );
                    }
                },
            ],
            { cancelable: true }
        );
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setEditTaskVisible(true);
    };

    const handleAddTask = () => {
        if (!newTask.name.trim()) return;

        addTask(
            newTask,
            () => {
                loadTasks();
                setAddTaskVisible(false);
                setNewTask({ name: '', description: '', category });
            },
            (error) => console.error('Error adding task:', error)
        );
    };

    const handleSaveTask = () => {
        if (!currentTask.name.trim()) {
            Alert.alert('Validation Error', 'Task name is required.');
            return;
        }

        updateTask(
            currentTask,
            () => {
                loadTasks();
                setEditTaskVisible(false);
                setCurrentTask(null);
            },
            (error) => console.error('Error updating task:', error)
        );
    };

    const renderTaskItem = ({ item }) => (
        <View style={styles.taskItem}>
            <View style={styles.taskDetails}>
                <Text style={styles.taskText}>{item.name}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
            </View>
            <View style={styles.taskActions}>
                <TouchableOpacity onPress={() => handleEditTask(item)}>
                    <Ionicons name="create" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                    <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container2}>
            <View style={styles.headerContainer2}>
                <Text style={styles.headerText22}>Task's Left:</Text>
            </View>
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTaskItem}
            />
            <TouchableOpacity
                style={styles.addButton2}
                onPress={() => setAddTaskVisible(true)}
            >
                <View style={styles.addButtonContainer}>
                    <Text style={styles.addButtonText}>Add New Task</Text>
                    <FontAwesome6 style={styles.addButtonIcon} name="pencil" size={24} color="white" />
                </View>     
            </TouchableOpacity>

            <EditTaskModal
                visible={editTaskVisible}
                onClose={() => setEditTaskVisible(false)}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                handleSaveTask={handleSaveTask}
            />
            <AddTaskModal
                visible={addTaskVisible}
                onClose={() => setAddTaskVisible(false)}
                newTask={newTask}
                setNewTask={setNewTask}
                handleAddTask={handleAddTask}
            />
        </SafeAreaView>
    );
};

export default TaskCategoryScreen;