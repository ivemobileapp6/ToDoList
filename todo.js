'use strict';

const todoItems = [];

// Function to Add Task 
function addTask(task) {
  if (typeof task !== 'string') return false;
  if (todoItems.findIndex((item) => item.task === task) !== -1) return false;

  todoItems.push({ id: todoItems.length, task });
  return true;
}

// Function to Remove Task 
function removeTask(id) {
  const index = todoItems.findIndex((item) => item.id === id);
  if (index === -1) return false;

  todoItems.splice(index, 1);
  return true;
}

// Function to List Tasks
function listTasks() {
  return todoItems.map((item) => ({ id: item.id, task: item.task }));
}

module.exports = {
  addTask,
  removeTask,
  listTasks,
};
