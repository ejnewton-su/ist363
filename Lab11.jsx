import React, { useState } from 'react';

const App = () => {
  
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete Lab 11", completed: false },
    { id: 2, text: "Review JSX Events and State", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTask.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTodo]);
    setNewTask("");
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <form onSubmit={handleAddTask}>
        <input type="text" value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="Add New Task"/>
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none"
              }}>
              {task.text}
            </span>
            {!task.completed && (
              <button onClick={() => handleToggleComplete(task.id)} style={{ color: "red" }}> X</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;