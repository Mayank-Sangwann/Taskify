import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../styles';

/**
 * AddTaskModal component for displaying a modal to add a new task.
 * 
 * @param {boolean} visible - Determines whether the modal is visible or not.
 * @param {function} onClose - Function to close the modal.
 * @param {object} newTask - The new task object with its properties (name, description, category).
 * @param {function} setNewTask - Function to update the task state.
 * @param {function} handleAddTask - Function to handle adding the new task.
 */
const AddTaskModal = ({ visible, onClose, newTask, setNewTask, handleAddTask }) => {

    /**
     * Validates the task inputs before adding.
     * Ensures both task name and category are filled.
     * 
     * @returns {boolean} - Returns true if inputs are valid, otherwise false.
     */
    const validateInputs = () => {
        if (!newTask.name.trim() || !newTask.category.trim()) {
            Alert.alert('Validation Error', 'Task name and category are required.');
            return false;
        }
        return true;
    };

    /**
     * Handles the save action. Validates inputs and triggers the add task functionality.
     */
    const handleSave = () => {
        if (validateInputs()) {
            handleAddTask(); // Call the function to add the new task
            onClose(); // Close the modal
        }
    };

    return (
        <Modal
            visible={visible} // Determines the visibility of the modal
            animationType="fade" // Sets the fade-in effect for the modal
            transparent={true} // Makes the modal background transparent
            onRequestClose={onClose} // Handles modal close request
        >
            {/* TouchableOpacity for dismissing the modal by touching outside */}
            <TouchableOpacity
                style={styles.addTaskModal} 
                activeOpacity={1} // Prevents modal from closing accidentally
                onPress={onClose} // Closes the modal on outside press
            >
                {/* Main modal content */}
                <View style={styles.addTaskContainer}>
                    <Text style={styles.addTaskTitle}>Add Task</Text>

                    {/* Task Name Input */}
                    <TextInput
                        style={styles.addTaskInput}
                        placeholder="Task Name *" // Placeholder text for task name input
                        placeholderTextColor="#A0AEC0" // Color of placeholder text
                        value={newTask.name} // The current task name value
                        onChangeText={(text) => setNewTask({ ...newTask, name: text })} // Update task name
                    />

                    {/* Task Description Input (Optional) */}
                    <TextInput
                        style={styles.addTaskInput}
                        placeholder="Task Description" // Placeholder text for task description input
                        placeholderTextColor="#A0AEC0" // Color of placeholder text
                        value={newTask.description} // The current task description value
                        onChangeText={(text) => setNewTask({ ...newTask, description: text })} // Update task description
                    />

                    {/* Task Category Input */}
                    <TextInput
                        style={styles.addTaskInput}
                        placeholder="Task Category *" // Placeholder text for task category input
                        placeholderTextColor="#A0AEC0" // Color of placeholder text
                        value={newTask.category} // The current task category value
                        onChangeText={(text) => setNewTask({ ...newTask, category: text })} // Update task category
                    />

                    {/* Save Button */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Entypo name="add-to-list" size={45} color="white" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default AddTaskModal;
