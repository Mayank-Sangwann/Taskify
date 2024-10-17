import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from '../styles';

const EditTaskModal = ({ visible, onClose, currentTask, setCurrentTask, handleSaveTask }) => {    
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.editTaskModal}
                activeOpacity={1}
                onPress={onClose}
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
                        editable={true}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
                        <Entypo name="add-to-list" size={45} color="white" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

EditTaskModal.defaultProps = {
    setCurrentTask: () => {},
};

export default EditTaskModal;
