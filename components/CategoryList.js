import React from 'react'; 
import { FlatList, Alert } from 'react-native'; 
import CategoryItem from './CategoryItem'; 

/**
 * CategoryList component renders a list of categories.
 * 
 * @param {object} props - Component properties
 * @param {Array<string>} props.categories - An array of category names.
 * @param {function} props.onCategoryPress - Function to handle press on a category item.
 * @param {function} props.onDeleteCategory - Function to handle deletion of a category.
 */
const CategoryList = ({ categories, onCategoryPress, onDeleteCategory }) => {
    
    /**
     * Renders a single category item in the list.
     * 
     * @param {object} param - Contains item data from FlatList
     * @param {string} param.item - The category name
     * @returns {JSX.Element} - A rendered CategoryItem component
     */
    const renderCategoryItem = ({ item }) => (
        <CategoryItem
            item={item} // Pass the category name as item
            onPress={() => onCategoryPress(item)} // Handle press on category item
            onDelete={() => {
                // Show an alert to confirm deletion of the category
                Alert.alert(
                    'Delete Category', // Alert title
                    `Are you sure you want to delete the category "${item}"? This will delete all associated tasks.`,
                    [
                        { text: 'Cancel', style: 'cancel' }, // Cancel button
                        { text: 'Delete', onPress: () => onDeleteCategory(item), style: 'destructive' }, // Delete button
                    ]
                );
            }}
        />
    );

    return (
        // Render a FlatList to display the categories
        <FlatList
            data={categories} // Data source for the FlatList
            renderItem={renderCategoryItem} // Function to render each item
            keyExtractor={(item) => item} // Unique key for each item based on the category name
            showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        />
    );
};

export default CategoryList; // Exporting the component for use in other files
