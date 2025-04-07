import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete Lab 11', completed: false },
    { id: 2, text: 'Review JSX Events and State', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTodo]);
    setNewTask('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>To-Do List</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '10px' }}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                marginRight: '10px',
              }}
            >
              {task.text}
            </span>
            {!task.completed && (
              <button onClick={() => handleToggleComplete(task.id)}>X</button>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit" style={{ marginLeft: '5px' }}>
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoList;


export default App
