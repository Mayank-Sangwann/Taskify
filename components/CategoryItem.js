import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

const CategoryItem = ({ item, onPress, onDelete }) => {


    const renderRightActions = () => (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Ionicons name="trash" size={34} color="#FF6F61" />
        </TouchableOpacity>
    );

    return (
        // Swipeable container for swipe-to-delete functionality
        <Swipeable 
            renderRightActions={renderRightActions} // Render the delete button when swiped
            overshootRight={false} // Prevents overshooting the swipe beyond the right edge
        >
            {/* Touchable category item */}
            <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
                <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
        </Swipeable>
    );
};

export default CategoryItem;
