import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/todos') // Replace with the actual endpoint
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (taskId) => {
    // Send a DELETE request to your backend API to delete the task
    axios.delete(`http://localhost:8080/api/todos/${taskId}`) // Replace with the actual endpoint
      .then(() => {
        // After successful deletion, remove the task from the state
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch((error) => console.error(error));
  };

  const handleToggleCompletion = (taskId, isCompleted) => {
    // Toggle the completion status locally first
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !isCompleted };
      }
      return task;
    });

    setTasks(updatedTasks);

    // Send a PATCH or PUT request to update the completion status in the backend
    axios.patch(`http://localhost:8080/api/todos/${taskId}`, { completed: !isCompleted })
      .then(() => {
        // The task's completion status has been updated on the backend
        // You can choose to handle any additional logic here if needed
      })
      .catch((error) => {
        console.error(error);
        // If there's an error, revert the local state to its previous state
        setTasks(tasks);
      });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>Title:</strong> {task.title}<br />
            <strong>Description:</strong> {task.description}<br />
            <strong>Date:</strong> {task.date}<br />
            <strong>Status:</strong> {task.completed ? 'Completed' : 'Incomplete'}<br />
            <button onClick={() => handleToggleCompletion(task.id, task.completed)}>
              {task.completed ? 'Mark Incomplete' : 'Mark Completed'}
            </button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;



