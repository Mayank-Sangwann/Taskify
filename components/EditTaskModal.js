import React from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import styles from '../styles'; 

/**
 * EditTaskModal component displays a modal for editing a task's details.
 * 
 * @param {object} props - Component properties
 * @param {boolean} props.visible - Indicates if the modal is visible.
 * @param {function} props.onClose - Function to close the modal.
 * @param {object} props.currentTask - The current task object to be edited.
 * @param {function} props.setCurrentTask - Function to update the current task state.
 * @param {function} props.handleSaveTask - Function to handle saving the edited task.
 * @returns {JSX.Element} - A modal for editing task details.
 */
const EditTaskModal = ({ visible, onClose, currentTask, setCurrentTask, handleSaveTask }) => {
    return (
        <Modal
            visible={visible} // Modal visibility controlled by prop
            animationType="fade" // Fade animation when modal appears
            transparent={true} // Transparent background for the modal
            onRequestClose={onClose} // Handle back button press to close modal
        >
            <TouchableOpacity
                style={styles.editTaskModal} // Style for the modal background
                activeOpacity={1} // Make TouchableOpacity non-interactive to allow background tap
                onPress={onClose} // Close modal on background press
            >
                {/* Container for editing task */}
                <View style={styles.editTaskContainer}> 
                    {/* Title of the modal */}
                    <Text style={styles.editTaskTitle}>Edit Task</Text> 
                    
                    {/* Input for task name */}
                    <TextInput
                        style={styles.editTaskInput} // Style for the input
                        placeholder="Task Name" // Placeholder text
                        placeholderTextColor="#C0C0C0" // Color for placeholder text
                        value={currentTask?.name} // Value controlled by currentTask state
                        onChangeText={(text) => setCurrentTask({ ...currentTask, name: text })} // Update task name
                    />

                    {/* Input for task description */}
                    <TextInput
                        style={styles.editTaskInput} // Style for the input
                        placeholder="Task Description" // Placeholder text
                        placeholderTextColor="#C0C0C0" // Color for placeholder text
                        value={currentTask?.description} // Value controlled by currentTask state
                        onChangeText={(text) => setCurrentTask({ ...currentTask, description: text })} // Update task description
                    />

                    {/* Input for task category */}
                    <TextInput
                        style={styles.editTaskInput} // Style for the input
                        placeholder="Task Category" // Placeholder text
                        placeholderTextColor="#C0C0C0" // Color for placeholder text
                        value={currentTask?.category} // Value controlled by currentTask state
                        editable={true} // Allow editing of category
                    />

                    {/* Button to save the edited task */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
                        {/* Icon for save button */}
                        <Entypo name="add-to-list" size={45} color="white" /> 
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default EditTaskModal; // Exporting the EditTaskModal component
