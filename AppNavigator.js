import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // For navigation between screens
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Native stack navigator
import TaskListScreen from './screens/TaskListScreen'; 
import TaskCategoryScreen from './screens/TaskCategoryScreen'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Gesture handler for better UX
import { useFonts } from "expo-font"; // For loading custom fonts
import AppLoading from 'expo-app-loading'; // Display a loading screen until fonts are loaded

// Create a stack navigator
const Stack = createNativeStackNavigator();

const App = () => {
    // Load custom fonts using useFonts hook
    const [fontsLoaded] = useFonts({
        "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    });

    // Show a loading screen if fonts are not loaded yet
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        // Navigation container is the root navigator
        <NavigationContainer>
            {/* GestureHandlerRootView for gesture handling across the app */}
            <GestureHandlerRootView style={{ flex: 1 }}>
                {/* Define the stack navigator and initial route */}
                <Stack.Navigator initialRouteName="TaskListScreen">
                    {/* Screen for Task List */}
                    <Stack.Screen 
                        name="TaskListScreen" 
                        component={TaskListScreen} 
                        options={{
                            title: 'Taskify!', // Title for the screen
                            headerShown: false, // Hides the header for this screen
                        }} 
                    />
                    {/* Screen for Task Category */}
                    <Stack.Screen 
                        name="TaskCategoryScreen" 
                        component={TaskCategoryScreen}
                        options={({ route }) => ({
                            headerSearchBarOptions: {
                                placeholder: 'Search Task...', // Search bar placeholder
                            },
                            title: route.params.category, // Title dynamically set to the category name
                            headerTitleStyle: {
                                fontFamily: 'Poppins-ExtraBold', // Custom font for header title
                                fontSize: 22 // Font size for the title
                            }
                        })}
                    />
                </Stack.Navigator>
            </GestureHandlerRootView>
        </NavigationContainer>
    );
};

export default App;
