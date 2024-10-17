import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import TaskListScreen from './screens/TaskListScreen';
import TaskCategoryScreen from './screens/TaskCategoryScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from "expo-font";
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

const App = () => {
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
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack.Navigator initialRouteName="TaskListScreen">
                    <Stack.Screen 
                        name="TaskListScreen" 
                        component={TaskListScreen} 
                        options={{
                            title: 'Taskify!',
                            headerShown: false,
                        }} 
                    />
                    <Stack.Screen 
                        name="TaskCategoryScreen" 
                        component={TaskCategoryScreen}
                        options={({ route }) => ({
                            headerSearchBarOptions: {
                                placeholder: 'Search Task...',
                              },
                            title: route.params.category,
                            headerTitleStyle: {
                                fontFamily: 'Poppins-ExtraBold',
                                fontSize: 22
                              }
                        })}
                    />
                </Stack.Navigator>
            </GestureHandlerRootView>
        </NavigationContainer>
    );
};

export default App;
