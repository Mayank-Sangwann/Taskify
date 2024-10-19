import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform, 
    Alert, 
    SafeAreaView 
} from 'react-native';
import { useFonts } from "expo-font";
import AppLoading from 'expo-app-loading'; // To show a loading screen until fonts are loaded
import WavyHeader from '../components/customHeader'; // Custom header component
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Icon library
import AddTaskModal from '../components/AddTaskModal'; // Modal for adding tasks
import CategoryList from '../components/CategoryList'; // Component to display list of categories
import styles from '../styles'; // Importing styles

import { initializeDatabase, getAllTasks, addTask, deleteTasksByCategory } from '../database/database'; // Database functions

const TaskListScreen = ({ navigation }) => {
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

    // Display loading screen until fonts are loaded
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    // State variables
    const [tasks, setTasks] = useState([]); // To store the list of all tasks
    const [categories, setCategories] = useState([]); // To store unique categories extracted from tasks
    const [addTaskVisible, setAddTaskVisible] = useState(false); // Control visibility of AddTaskModal
    const [newTask, setNewTask] = useState({ name: '', description: '', category: '' }); // New task details

    // Initialize database and load tasks on component mount
    useEffect(() => {
        initializeDatabase(); // Initialize SQLite database
        loadTasks(); // Load all tasks from the database
    }, []);

    // Update categories whenever tasks change
    useEffect(() => {
        extractCategories(); // Extract unique categories from tasks
    }, [tasks]);

    // Load all tasks from the database and set the state
    const loadTasks = () => {
        getAllTasks(
            (tasks) => setTasks(tasks), // Set tasks to state when fetched successfully
            (error) => console.error('Error loading tasks:', error) // Handle any error in fetching
        );
    };

    // Save the new task to the database and reload tasks
    const saveTask = () => {
        addTask(
            newTask, // Pass new task details to the database
            () => {
                loadTasks(); // Reload tasks after adding a new one
                setNewTask({ name: '', description: '', category: '' }); // Reset the new task input
                setAddTaskVisible(false); // Close the modal
            },
            (error) => console.error('Error saving task:', error) // Handle any error in saving
        );
    };

    // Extract unique categories from tasks and update the state
    const extractCategories = () => {
        const uniqueCategories = [...new Set(tasks.map(task => task.category))]; // Extract unique categories
        setCategories(uniqueCategories); // Update categories state
    };

    // Navigate to a screen showing tasks for a specific category
    const handleCategoryPress = (category) => {
        const filteredTasks = tasks.filter(task => task.category === category); // Filter tasks by category
        navigation.navigate('TaskCategoryScreen', { tasks: filteredTasks, category }); // Navigate to category screen
    };

    // Handle adding a new task
    const handleAddTask = () => {
        // Validate that the task name and category are provided
        if (!newTask.name.trim() || !newTask.category.trim()) {
            Alert.alert('Validation Error', 'Task name and category are required.'); // Show error message
            return;
        }

        saveTask(); // Save the task to the database if valid
    };

    // Delete all tasks in a specific category
    const deleteCategory = (category) => {
        deleteTasksByCategory(
            category, // Pass category to delete its tasks
            () => loadTasks(), // Reload tasks after deletion
            (error) => console.error('Error deleting category tasks:', error) // Handle any error in deletion
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container1}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior for iOS and Android
        >
            <SafeAreaView style={styles.container1}>
                {/* Custom wavy header */}
                <WavyHeader customStyles={styles.svgCurve} /> 
                <View style={styles.headerContainer}>
                    {/* App title */}
                    <Text style={styles.headerText1}>Welcome to</Text>
                    <Text style={styles.headerText2}>TASKIFY!</Text> 
                </View>
                {/* Section header for categories */}
                <Text style={styles.hd2}>-Categories-</Text> 
                
                {/* List of categories with delete functionality */}
                <CategoryList 
                    categories={categories} 
                    onCategoryPress={handleCategoryPress} 
                    onDeleteCategory={deleteCategory} 
                />

                {/* Button to open AddTaskModal */}
                <TouchableOpacity
                    style={styles.addButton1}
                    onPress={() => setAddTaskVisible(true)} // Open modal to add a new task
                >
                    {/* Icon for add button */}
                    <FontAwesome name="plus-circle" size={80} color="#9381FF" /> 
                </TouchableOpacity>

                {/* Modal for adding a new task */}
                <AddTaskModal
                    visible={addTaskVisible}
                    onClose={() => setAddTaskVisible(false)} // Close the modal
                    newTask={newTask} // Pass new task data
                    setNewTask={setNewTask} // Function to update new task data
                    handleAddTask={handleAddTask} // Function to handle adding a task
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default TaskListScreen;
