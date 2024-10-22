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

**Dependency Management**: Managing dependencies effectively was another challenge. With multiple libraries and packages used for functionality (like React Navigation, Expo, and others), keeping them updated and ensuring compatibility between them was essential. Conflicts arising from version mismatches and deprecated packages required careful monitoring, which sometimes led to additional troubleshooting and testing to ensure the application remained stable and functional.

**SQLite Database Integration**: One of the challenges faced during the development was integrating SQLite for data storage. Understanding how to set up the database schema, perform CRUD (Create, Read, Update, Delete) operations, and manage data effectively required a significant amount of learning. Handling asynchronous database calls and ensuring data integrity while preventing potential data loss during operations were also critical aspects that needed careful implementation.

## Demo
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/d571a735-1882-434b-bc79-861e60a0fa38" alt="Home Screen" width="200"></td>
    <td><img src="https://github.com/user-attachments/assets/c5e1d266-0eaa-4c87-8bfa-c49329fe70e0" alt="Task List Screen" width="200"></td>
    <td><img src="https://github.com/user-attachments/assets/fbe91a9d-f494-4a85-a7b0-d1e7d2abbcec" alt="Task List Screen" width="200"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/d6f58991-d694-4718-8c51-7d21962413ec" alt="Task List Screen" width="200"></td>
    <td><img src="https://github.com/user-attachments/assets/1476dc6c-3bde-4c1b-8c58-84217fd939c8" alt="Task List Screen" width="200"></td>
    <td><img src="https://github.com/user-attachments/assets/c5ee10ef-ee2b-4600-89ae-8f5caee80a76" alt="Add Task Screen" width="200"></td>
  </tr>
</table>



### Contributing
Feel free to contribute by opening issues or creating pull requests. Contributions to improve the app or fix bugs are welcome!
