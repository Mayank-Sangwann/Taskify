import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons like edit and delete
import { useFonts } from "expo-font"; // To load custom fonts
import AppLoading from 'expo-app-loading'; // To show loading screen until fonts are loaded
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'; // Another icon set
import EditTaskModal from '../components/EditTaskModal'; // Modal for editing tasks
import AddTaskModal from '../components/AddTaskModal'; // Modal for adding tasks
import styles from '../styles'; // Importing the styles

import { initializeDatabase, getTasksByCategory, addTask, updateTask, deleteTask } from '../database/database'; // Database functions

const TaskCategoryScreen = ({ route }) => {
    // Extract category passed via route
    const { category } = route.params;

    // State variables
    const [filteredTasks, setFilteredTasks] = useState([]); // Store tasks of the selected category
    const [editTaskVisible, setEditTaskVisible] = useState(false); // To control visibility of EditTaskModal
    const [addTaskVisible, setAddTaskVisible] = useState(false); // To control visibility of AddTaskModal
    const [currentTask, setCurrentTask] = useState(null); // Task to be edited
    const [newTask, setNewTask] = useState({ name: '', description: '', category }); // New task data

    // Load custom fonts
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

    // Show loading screen until fonts are loaded
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    // Initialize database and load tasks when the component is mounted
    useEffect(() => {
        initializeDatabase(); // Initialize the SQLite database
        loadTasks(); // Load tasks for the selected category
    }, []);

    // Function to load tasks by category from the database
    const loadTasks = () => {
        getTasksByCategory(
            category, // Category passed via route
            (tasks) => setFilteredTasks(tasks), // Update the state with the tasks fetched
            (error) => console.error('Error loading tasks:', error) // Handle errors
        );
    };

    // Function to handle task deletion
    const handleDeleteTask = (taskId) => {
        // Confirm before deleting the task
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: () => {
                        deleteTask(
                            taskId, // Task ID to delete
                            () => loadTasks(), // Reload tasks after deletion
                            (error) => console.error('Error deleting task:', error) // Handle errors
                        );
                    },
                },
            ],
            { cancelable: true }
        );
    };

    // Function to handle editing a task
    const handleEditTask = (task) => {
        setCurrentTask(task); // Set the selected task for editing
        setEditTaskVisible(true); // Open the edit modal
    };

    // Function to handle adding a new task
    const handleAddTask = () => {
        if (!newTask.name.trim()) return; // Validate that task name is not empty

        addTask(
            newTask, // New task details
            () => {
                loadTasks(); // Reload tasks after adding a new one
                setAddTaskVisible(false); // Close the add task modal
                setNewTask({ name: '', description: '', category }); // Reset the new task input
            },
            (error) => console.error('Error adding task:', error) // Handle errors
        );
    };

    // Function to save changes to a task
    const handleSaveTask = () => {
        if (!currentTask.name.trim()) {
            Alert.alert('Validation Error', 'Task name is required.'); // Validate task name
            return;
        }

        updateTask(
            currentTask, // Updated task details
            () => {
                loadTasks(); // Reload tasks after update
                setEditTaskVisible(false); // Close the edit task modal
                setCurrentTask(null); // Reset the current task
            },
            (error) => console.error('Error updating task:', error) // Handle errors
        );
    };

    // Function to render each task item in the list
    const renderTaskItem = ({ item }) => (
        <View style={styles.taskItem}>
            <View style={styles.taskDetails}>
                {/* Task name */}
                <Text style={styles.taskText}>{item.name}</Text> 
                {/* Task description */}
                <Text style={styles.taskDescription}>{item.description}</Text> 
            </View>
            <View style={styles.taskActions}>
                <TouchableOpacity onPress={() => handleEditTask(item)}>
                    {/* Edit icon */}
                    <Ionicons name="create" size={26} color="blue" /> 
                </TouchableOpacity>
                <Text> </Text>
                <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                    {/* Delete icon */}
                    <Ionicons name="trash" size={26} color="red" /> 
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container2}>
            <View style={styles.headerContainer2}>
                {/* Header for task count */}
                <Text style={styles.headerText22}>Task's Left:</Text> 
            </View>
            {/* Display the list of tasks */}
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id.toString()} // Unique key for each task item
                renderItem={renderTaskItem} // Function to render each task
            />
            {/* Button to add a new task */}
            <TouchableOpacity
                style={styles.addButton2}
                onPress={() => setAddTaskVisible(true)} // Open add task modal
            >
                <View style={styles.addButtonContainer}>
                    <Text style={styles.addButtonText}>Add New Task</Text>
                    {/* Add icon */}
                    <FontAwesome6 style={styles.addButtonIcon} name="pencil" size={24} color="white" /> 
                </View>
            </TouchableOpacity>

            {/* Modal to edit tasks */}
            <EditTaskModal
                visible={editTaskVisible}
                onClose={() => setEditTaskVisible(false)} // Close edit modal
                currentTask={currentTask} // Pass the current task to the modal
                setCurrentTask={setCurrentTask} // Function to update the current task
                handleSaveTask={handleSaveTask} // Function to save task
            />

            {/* Modal to add new tasks */}
            <AddTaskModal
                visible={addTaskVisible}
                onClose={() => setAddTaskVisible(false)} // Close add task modal
                newTask={newTask} // Pass the new task to the modal
                setNewTask={setNewTask} // Function to update new task details
                handleAddTask={handleAddTask} // Function to add task
            />
        </SafeAreaView>
    );
};

export default TaskCategoryScreen;
