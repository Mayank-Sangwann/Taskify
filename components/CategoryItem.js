import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

/**
 * CategoryItem component renders a category item with swipe-to-delete functionality.
 * 
 * @param {object} props - Component properties
 * @param {string} props.item - The name of the category item.
 * @param {function} props.onPress - Function to handle press on the category item.
 * @param {function} props.onDelete - Function to handle the deletion of the category item.
 */
const CategoryItem = ({ item, onPress, onDelete }) => {

    /**
     * Renders the delete button when the item is swiped.
     * 
     * @returns {JSX.Element} - A TouchableOpacity containing a trash icon.
     */
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
