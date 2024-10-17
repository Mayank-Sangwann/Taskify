import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('tasks.db');

// Initialize database and create tables if not exists
export const initializeDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, category TEXT);',
            [],
            () => { console.log('Database initialized'); },
            (_, error) => { console.error('Error initializing database:', error); }
        );
    });
};

// Get all tasks
export const getAllTasks = (successCallback, errorCallback) => {
  db.transaction(tx => {
      tx.executeSql(
          'SELECT * FROM tasks;',
          [],
          (_, { rows }) => successCallback(rows._array),
          (_, error) => errorCallback(error)
      );
  });
};

// Fetch tasks by category
export const getTasksByCategory = (category, successCallback, errorCallback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM tasks WHERE category = ?;',
            [category],
            (_, { rows }) => successCallback(rows._array),
            (_, error) => errorCallback(error)
        );
    });
};

export const deleteTasksByCategory = (category, successCallback, errorCallback) => {
  db.transaction(tx => {
      tx.executeSql(
          'DELETE FROM tasks WHERE category = ?;',
          [category],
          (_, result) => successCallback(result),
          (_, error) => errorCallback(error)
      );
  });
};
// Add new task
export const addTask = (task, successCallback, errorCallback) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO tasks (name, description, category) VALUES (?, ?, ?);',
            [task.name, task.description, task.category],
            (_, result) => successCallback(result),
            (_, error) => errorCallback(error)
        );
    });
};

// Update existing task
export const updateTask = (task, successCallback, errorCallback) => {
    db.transaction(tx => {
        tx.executeSql(
            'UPDATE tasks SET name = ?, description = ? WHERE id = ?;',
            [task.name, task.description, task.id],
            (_, result) => successCallback(result),
            (_, error) => errorCallback(error)
        );
    });
};

// Delete a task
export const deleteTask = (taskId, successCallback, errorCallback) => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM tasks WHERE id = ?;',
            [taskId],
            (_, result) => successCallback(result),
            (_, error) => errorCallback(error)
        );
    });
};
