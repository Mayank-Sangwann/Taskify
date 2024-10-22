# Taskify
## Overview
Taskify is a task management app designed to help users organize and manage tasks efficiently. It provides features like creating, viewing, editing, and deleting tasks, along with categorizing tasks for better organization. The app offers a modern, minimalistic user interface and a smooth user experience, built using React Native and Expo.

## Features
Add Task: Users can create new tasks with a name, description, and category.
Edit Task: Modify task details directly within the app.
Delete Task: Swipe to delete functionality for easy task management.
Category Management: Tasks are organized by categories for improved task sorting and filtering.
Offline Support: SQLite is used for local task storage, ensuring tasks are saved even without an internet connection.
Technologies Used
React Native: For building the user interface and app logic.
Expo: A framework for deploying the app across platforms.
SQLite: For local storage of tasks and categories.
React Native Reanimated: Used for implementing swipe-to-delete functionality.
Expo Splash Screen: For improved app loading experience.

## Design Decisions
**Minimalist UI**: The design of Taskify follows a minimalist approach, focusing on clean lines, simple colors, and intuitive navigation to make task management easier and faster for the user. We aimed to reduce cognitive load by keeping the interface clutter-free.

**Categorization**: Instead of a simple list of tasks, we chose to implement a category-based organization. This helps users manage a larger number of tasks by grouping them into meaningful categories, making it easier to navigate and focus on specific areas of work.

**Offline Functionality**: Since task management apps are frequently used on the go, the app was designed to work fully offline using SQLite for local storage. This ensures that tasks can be accessed, created, and edited without internet connectivity.

## Challenges Overcome
Integrating Swipe-to-Delete: Initially, we faced difficulties in integrating swipe gestures with task deletion. After experimenting with several libraries, we settled on react-native-reanimated for smooth swipe functionality. Handling swipe interactions alongside touch-based navigation required careful balancing of event listeners to prevent unintentional task deletions.

Transitioning from expo-app-loading to expo-splash-screen: During development, we received warnings regarding the deprecation of expo-app-loading. We successfully migrated to expo-splash-screen by implementing SplashScreen.preventAutoHideAsync() and managing splash screen behavior effectively, ensuring a seamless user experience during app startup.

Data Persistence with SQLite: Ensuring data consistency when dealing with SQLite across multiple screens (such as task categories and task details) required careful handling of database queries and state management. We managed this challenge by implementing centralized logic for database interactions.

## Screenshots

<img src="https://github.com/user-attachments/assets/d571a735-1882-434b-bc79-861e60a0fa38" alt="Home Screen" style="width: 30%; margin-right: 10px;">
<img src="path_to_add_task_screenshot" alt="Add Task Screen" style="width: 30%; margin-right: 10px;">
<img src="path_to_task_list_screenshot" alt="Task List Screen" style="width: 30%;">

Contributing
Feel free to contribute by opening issues or creating pull requests. Contributions to improve the app or fix bugs are welcome!
