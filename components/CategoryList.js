import React from 'react';
import { FlatList, Alert } from 'react-native';
import CategoryItem from './CategoryItem';

const CategoryList = ({ categories, onCategoryPress, onDeleteCategory }) => {
    const renderCategoryItem = ({ item }) => (
        <CategoryItem
            item={item}
            onPress={() => onCategoryPress(item)}
            onDelete={() => {
                Alert.alert(
                    'Delete Category',
                    `Are you sure you want to delete the category "${item}"? This will delete all associated tasks.`,
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Delete', onPress: () => onDeleteCategory(item), style: 'destructive' },
                    ]
                );
            }}
        />
    );

    return (
        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default CategoryList;
