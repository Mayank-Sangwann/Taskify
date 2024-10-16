import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('tasks.db');

const TaskCategoryScreen = ({ route }) => {
    const { category } = route.params;
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [editTaskVisible, setEditTaskVisible] = useState(false);
    const [addTaskVisible, setAddTaskVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [newTask, setNewTask] = useState({ name: '', description: '', category });

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tasks WHERE category = ?;',
                [category],
                (_, { rows }) => {
                    setFilteredTasks(rows._array);
                },
                (_, error) => {
                    console.error('Error loading tasks:', error);
                }
            );
        });
    };

    const handleDeleteTask = (taskId) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM tasks WHERE id = ?;',
                [taskId],
                (_, result) => {
                    loadTasks(); // Reload tasks after deletion
                },
                (_, error) => {
                    console.error('Error deleting task:', error);
                }
            );
        });
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setEditTaskVisible(true);
    };

    const handleUpdateTask = () => {
        if (!currentTask) return;

        db.transaction(tx => {
            tx.executeSql(
                'UPDATE tasks SET name = ?, description = ?, category = ? WHERE id = ?;',
                [currentTask.name, currentTask.description, currentTask.category, currentTask.id],
                (_, result) => {
                    loadTasks(); // Reload tasks after update
                    setEditTaskVisible(false);
                    setCurrentTask(null);
                },
                (_, error) => {
                    console.error('Error updating task:', error);
                }
            );
        });
    };

    const handleAddTask = () => {
        if (!newTask.name.trim()) return;

        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO tasks (name, description, category) VALUES (?, ?, ?);',
                [newTask.name, newTask.description, newTask.category],
                (_, result) => {
                    loadTasks(); // Reload tasks after adding
                    setAddTaskVisible(false);
                    setNewTask({ name: '', description: '', category }); // Reset new task input
                },
                (_, error) => {
                    console.error('Error adding task:', error);
                }
            );
        });
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
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTaskItem}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setAddTaskVisible(true)}
            >
                <Ionicons name="add" size={36} color="white" />
            </TouchableOpacity>

            <Modal
                visible={editTaskVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setEditTaskVisible(false)}
            >
                <TouchableOpacity
                    style={styles.editTaskModal}
                    activeOpacity={1}
                    onPress={() => setEditTaskVisible(false)}
                >
                    <View style={styles.editTaskContainer}>
                        <Text style={styles.editTaskTitle}>Edit Task</Text>
                        <TextInput
                            style={styles.editTaskInput}
                            placeholder="Task Name"
                            placeholderTextColor="#C0C0C0"
                            value={currentTask?.name}
                            onChangeText={(text) => setCurrentTask({ ...currentTask, name: text })}
                        />
                        <TextInput
                            style={styles.editTaskInput}
                            placeholder="Task Description"
                            placeholderTextColor="#C0C0C0"
                            value={currentTask?.description}
                            onChangeText={(text) => setCurrentTask({ ...currentTask, description: text })}
                        />
                        <TextInput
                            style={styles.editTaskInput}
                            placeholder="Task Category"
                            placeholderTextColor="#C0C0C0"
                            value={currentTask?.category}
                            editable={false} // Make category input read-only
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleUpdateTask}>
                            <Ionicons name="checkmark-circle" size={36} color="blue" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

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
                            placeholder="Task Category"
                            placeholderTextColor="#C0C0C0"
                            value={newTask.category}
                            editable={false} // Make category input read-only
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleAddTask}>
                            <Ionicons name="checkmark-circle" size={36} color="green" />
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
    categoryTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center',
        color: '#555',
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    taskDetails: {
        flex: 1,
    },
    taskText: {
        fontSize: 18,
    },
    taskDescription: {
        fontSize: 14,
        color: '#666',
    },
    taskActions: {
        flexDirection: 'row',
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
    addButton: {
        backgroundColor: '#1e90ff', // Match with TaskListScreen
        borderRadius: 50,
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 16,
        right: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TaskCategoryScreen;
