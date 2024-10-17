import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../styles';

const AddTaskModal = ({ visible, onClose, newTask, setNewTask, handleAddTask }) => {
    const validateInputs = () => {
        if (!newTask.name.trim() || !newTask.category.trim()) {
            Alert.alert('Validation Error', 'Task name and category are required.');
            return false;
        }
        return true;
    };

    const handleSave = () => {
        if (validateInputs()) {
            handleAddTask();
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.addTaskModal}
                activeOpacity={1}
                onPress={onClose}
            >
                <View style={styles.addTaskContainer}>
                    <Text style={styles.addTaskTitle}>Add Task</Text>
                    <TextInput
                        style={styles.addTaskInput}
                        placeholder="Task Name *"
                        placeholderTextColor="#A0AEC0"
                        value={newTask.name}
                        onChangeText={(text) => setNewTask({ ...newTask, name: text })}
                    />
                    <TextInput
                        style={styles.addTaskInput}
                        placeholder="Task Description"
                        placeholderTextColor="#A0AEC0"
                        value={newTask.description}
                        onChangeText={(text) => setNewTask({ ...newTask, description: text })}
                    />
                    <TextInput
                        style={styles.addTaskInput}
                        placeholder="Task Category *"
                        placeholderTextColor="#A0AEC0"
                        value={newTask.category}
                        onChangeText={(text) => setNewTask({ ...newTask, category: text })}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Entypo name="add-to-list" size={45} color="white" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default AddTaskModal;
