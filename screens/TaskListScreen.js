import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, SafeAreaView, } from 'react-native';
import { useFonts } from "expo-font";
import AppLoading from 'expo-app-loading';
import WavyHeader from '../components/customHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AddTaskModal from '../components/AddTaskModal';
import CategoryList from '../components/CategoryList';
import styles from '../styles';

import { initializeDatabase, getAllTasks, addTask, deleteTasksByCategory } from '../database/database';

const TaskListScreen = ({ navigation }) => {
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
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [addTaskVisible, setAddTaskVisible] = useState(false);
    const [newTask, setNewTask] = useState({ name: '', description: '', category: '' });

    useEffect(() => {
        initializeDatabase();
        loadTasks();
    }, []);

    useEffect(() => {
        extractCategories();
    }, [tasks]);

    const loadTasks = () => {
        getAllTasks(
            (tasks) => setTasks(tasks),
            (error) => console.error('Error loading tasks:', error)
        );
    };

    const saveTask = () => {
        addTask(
            newTask,
            () => {
                loadTasks();
                setNewTask({ name: '', description: '', category: '' });
                setAddTaskVisible(false);
            },
            (error) => console.error('Error saving task:', error)
        );
    };

    const extractCategories = () => {
        const uniqueCategories = [...new Set(tasks.map(task => task.category))];
        setCategories(uniqueCategories);
    };

    const handleCategoryPress = (category) => {
        const filteredTasks = tasks.filter(task => task.category === category);
        navigation.navigate('TaskCategoryScreen', { tasks: filteredTasks, category });
    };

    const handleAddTask = () => {
        if (!newTask.name.trim() || !newTask.category.trim()) {
            Alert.alert('Validation Error', 'Task name and category are required.');
            return;
        }

        saveTask();
    };

    const deleteCategory = (category) => {
        deleteTasksByCategory(
            category,
            () => loadTasks(),
            (error) => console.error('Error deleting category tasks:', error)
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container1}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView style={styles.container1}>
                <WavyHeader customStyles={styles.svgCurve} />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText1}>Welcome to</Text>
                    <Text style={styles.headerText2}>TASKIFY!</Text>
                </View>
                <Text style={styles.hd2}>--Categories--</Text>
                
                <CategoryList 
                    categories={categories} 
                    onCategoryPress={handleCategoryPress} 
                    onDeleteCategory={deleteCategory} 
                />

                <TouchableOpacity
                    style={styles.addButton1}
                    onPress={() => setAddTaskVisible(true)}
                >
                    <FontAwesome name="plus-circle" size={80} color="#9381FF" />
                </TouchableOpacity>

                <AddTaskModal
                    visible={addTaskVisible}
                    onClose={() => setAddTaskVisible(false)}
                    newTask={newTask}
                    setNewTask={setNewTask}
                    handleAddTask={handleAddTask}
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default TaskListScreen;