import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import TaskListScreen from './screens/TaskListScreen';
import TaskCategoryScreen from './screens/TaskCategoryScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TaskListScreen">
                <Stack.Screen 
                    name="TaskListScreen" 
                    component={TaskListScreen} 
                    options={{
                        title: 'Taskify',
                        headerLargeTitle: true, 
                        headerTitleAlign: 'center', 
                    }}
                />

                <Stack.Screen 
                    name="TaskCategoryScreen" 
                    component={TaskCategoryScreen}
                    options={({ route }) => ({
                        title: route.params.category, // Access the category from route.params
                        headerTitleAlign: 'center',
                        headerSearchBarOptions: {
                            placeholder: 'Search task',
                            hideWhenScrolling: false,
                        } 
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
