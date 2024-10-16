import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('tasks.db'); // Open database

const TaskListScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [addTaskVisible, setAddTaskVisible] = useState(false);
    const [newTask, setNewTask] = useState({ name: '', description: '', category: '' });

    useEffect(() => {
        // Create table if it doesn't exist
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, category TEXT);'
            );
        });
        loadTasks();
    }, []);

    useEffect(() => {
        extractCategories();
    }, [tasks]);

    const loadTasks = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tasks;',
                [],
                (_, { rows }) => {
                    setTasks(rows._array);
                },
                (_, error) => {
                    console.error('Error loading tasks:', error);
                }
            );
        });
    };

    const saveTask = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO tasks (name, description, category) VALUES (?, ?, ?);',
                [newTask.name, newTask.description, newTask.category],
                (_, result) => {
                    console.log('Task added:', result);
                    loadTasks(); // Reload tasks after adding
                },
                (_, error) => {
                    console.error('Error saving task:', error);
                }
            );
        });
    };

    const extractCategories = () => {
        const uniqueCategories = [...new Set(tasks.map(task => task.category))];
        setCategories(uniqueCategories);
    };

    const handleCategoryPress = (category) => {
        // Pass the selected category and the filtered tasks to TaskCategoryScreen
        const filteredTasks = tasks.filter(task => task.category === category);
        navigation.navigate('TaskCategoryScreen', { tasks: filteredTasks, category });
    };

    const handleAddTask = () => {
        if (!newTask.name.trim() || !newTask.category.trim()) {
            Alert.alert('Validation Error', 'Task name and category are required.');
            return;
        }

        saveTask();
        setNewTask({ name: '', description: '', category: '' });
        setAddTaskVisible(false);
    };

    const deleteCategory = (category) => {
        db.transaction(tx => {
            // Delete all tasks associated with the category
            tx.executeSql(
                'DELETE FROM tasks WHERE category = ?;',
                [category],
                () => {
                    console.log(`All tasks in category "${category}" deleted.`);
                    loadTasks(); // Reload tasks after deletion
                },
                (_, error) => {
                    console.error('Error deleting category tasks:', error);
                }
            );
        });
    };

    const renderCategoryItem = ({ item }) => (
        <View style={styles.categoryItemContainer}>
            <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item)}>
                <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                    Alert.alert(
                        'Delete Category',
                        `Are you sure you want to delete the category "${item}"? This will delete all associated tasks.`,
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'Delete',
                                onPress: () => deleteCategory(item),
                                style: 'destructive',
                            },
                        ]
                    );
                }}
            >
                <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.secondaryHeading}>Task Categories</Text>

            <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={renderCategoryItem}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setAddTaskVisible(true)}
            >
                <Ionicons name="add" size={36} color="white" />
            </TouchableOpacity>

            <Modal
                visible={addTaskVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setAddTaskVisible(false)}
            >
                <TouchableOpacity
                    style={styles.editTaskModal}
                    activeOpacity={1}
                    onPress={() => setAddTaskVisible(false)}
                >
                    <View style={styles.editTaskContainer}>
                        <Text style={styles.editTaskTitle}>Add Task</Text>
                        <TextInput
                            style={styles.editTaskInput}
                            placeholder="Task Name *"
                            placeholderTextColor="#C0C0C0"
                            value={newTask.name}
                            onChangeText={(text) => setNewTask({ ...newTask, name: text })}
                        />
                        <TextInput
                            style={styles.editTaskInput}
                            placeholder="Task Description"
                            placeholderTextColor="#C0C0C0"
                            value={newTask.description}
                            onChangeText={(text) => setNewTask({ ...newTask, description: text })}
                        />
                        <TextInput
                            style={styles.editTaskInput}
                            placeholder="Task Category *"
                            placeholderTextColor="#C0C0C0"
                            value={newTask.category}
                            onChangeText={(text) => setNewTask({ ...newTask, category: text })}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleAddTask}>
                            <Ionicons name="checkmark-circle" size={36} color="blue" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#add8e6',
    },
    secondaryHeading: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'start',
        color: '#555',
    },
    categoryItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    categoryItem: {
        padding: 16,
        backgroundColor: '#ffcccb',
        borderRadius: 8,
        flex: 1,
    },
    categoryText: {
        fontSize: 18,
        color: '#333',
    },
    deleteButton: {
        padding: 8,
    },
    addButton: {
        backgroundColor: '#1e90ff',
        borderRadius: 50,
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 16,
        right: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editTaskModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    editTaskContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        width: '80%',
    },
    editTaskTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    editTaskInput: {
        height: 40,
        borderColor: '#b0c4de',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    saveButton: {
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 16,
    },
});

export default TaskListScreen;
