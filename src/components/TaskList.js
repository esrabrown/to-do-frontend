import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
// import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/todos')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (taskId) => {
    // Sending a DELETE request to backend API
    axios.delete(`http://localhost:8080/api/${taskId}`)
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
    axios.patch(`http://localhost:8080/api/${taskId}?completed=${!isCompleted}`, { completed: !isCompleted })
      .then(() => {
        // The task's completion status has been updated on the backend
      })
      .catch((error) => {
        console.error(error);
        // If there's an error, revert the local state to its previous state
        setTasks(tasks);
      });
  };

  const GreenCheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="green"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l2 2 4-4" />
    </svg>
  );

  const RedTrashIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="red"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M17 6l-1 14a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2L7 6" />
      <line x1="7" y1="3" x2="17" y2="3" />
    </svg>
  );

return (
  <div>
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className={`task-box ${task.completed ? 'completed' : ''}`}>
          <div className="task-title"> Title: {task.title}</div>
          <div className="task-description"> Description: {task.description}</div>
          <div className="task-date"> Date: {task.date}</div>
          <div className="task-status">Status: {task.completed ? 'Completed' : 'Incomplete'}</div>
          <div className="task-buttons">
          <button
              className={`complete-button ${task.completed ? 'completed' : ''}`}
              onClick={() => handleToggleCompletion(task.id, task.completed)}
            >
              {task.completed ? <GreenCheckIcon /> : 'Mark Completed'}
            </button>
            <button className="delete-button" onClick={() => handleDelete(task.id)}>
                <RedTrashIcon />
            </button>
          </div>
        </li>
      ))}
    </ul>
    <a href="http://localhost:3000/">Add More Tasks</a>
  </div>
);
};
export default TaskList;



