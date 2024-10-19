import * as SQLite from 'expo-sqlite/legacy'; // Importing the SQLite module from Expo for database operations

// Open the database or create one if it doesn't exist
const db = SQLite.openDatabase('tasks.db');

// Initialize the database and create the tasks table if it doesn't already exist
export const initializeDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            // SQL query to create the tasks table
            'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, category TEXT);',
            [], // No parameters for this query
            () => { console.log('Database initialized'); }, // Success callback
            (_, error) => { console.error('Error initializing database:', error); } // Error callback
        );
    });
};

// Fetch all tasks from the database
export const getAllTasks = (successCallback, errorCallback) => {
    db.transaction(tx => {
        tx.executeSql(
            // SQL query to select all rows from the tasks table
            'SELECT * FROM tasks;',
            [], // No parameters for this query
            (_, { rows }) => successCallback(rows._array), // Success callback with all tasks
            (_, error) => errorCallback(error) // Error callback
        );
    });
};

// Fetch tasks filtered by category
export const getTasksByCategory = (category, successCallback, errorCallback) => {
    db.transaction(tx => {
        tx.executeSql(
            // SQL query to select tasks based on the category
            'SELECT * FROM tasks WHERE category = ?;',
            [category], // Pass category as parameter
            (_, { rows }) => successCallback(rows._array), // Success callback with filtered tasks
            (_, error) => errorCallback(error) // Error callback
        );
    });
};

// Delete all tasks under a specific category
export const deleteTasksByCategory = (category, successCallback, errorCallback) => {
    db.transaction(tx => {
        tx.executeSql(
            // SQL query to delete tasks based on the category
            'DELETE FROM tasks WHERE category = ?;',
            [category], // Pass category as parameter
            (_, result) => successCallback(result), // Success callback after deletion
            (_, error) => errorCallback(error) // Error callback
        );
    });
};

// Add a new task to the database
export const addTask = (task, successCallback, errorCallback) => {
    db.transaction(tx => {
        tx.executeSql(
            // SQL query to insert a new task into the tasks table
            'INSERT INTO tasks (name, description, category) VALUES (?, ?, ?);',
            [task.name, task.description, task.category], // Pass task details as parameters
            (_, result) => successCallback(result), // Success callback after insertion
            (_, error) => errorCallback(error) // Error callback
        );
    });
};

// Update an existing task by id
export const updateTask = (task, successCallback, errorCallback) => {
    db.transaction(tx => {
        tx.executeSql(
            // SQL query to update a task based on its id
            'UPDATE tasks SET name = ?, description = ? WHERE id = ?;',
            [task.name, task.description, task.id], // Pass updated task details and id as parameters
            (_, result) => successCallback(result), // Success callback after update
            (_, error) => errorCallback(error) // Error callback
        );
    });
};

// Delete a task by its id
export const deleteTask = (taskId, successCallback, errorCallback) => {
    db.transaction(tx => {
        tx.executeSql(
            // SQL query to delete a task based on its id
            'DELETE FROM tasks WHERE id = ?;',
            [taskId], // Pass task id as parameter
            (_, result) => successCallback(result), // Success callback after deletion
            (_, error) => errorCallback(error) // Error callback
        );
    });
};
