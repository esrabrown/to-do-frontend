import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
// import { format, parseISO } from 'date-fns';
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

  const formatDate = (dateString) => {
    if (!dateString) {
      return "No Due Date"; // Handle case when due date is not provided
    }
// Assuming dateString is in "YYYY-MM-DD" format
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript Date
    const day = parseInt(dateParts[2]);

    const utcDate = new Date(Date.UTC(year, month, day)); // Set timezone to UTC

    if (isNaN(utcDate)) {
      return "Invalid Date";
    }

    // Convert UTC date to local date for display
    const localDate = new Date(utcDate.getTime() + (utcDate.getTimezoneOffset() * 60000));

    return localDate.toLocaleDateString();
  };



  const pendingTasks = () => {
    const pendingTasks = tasks.filter(task => !task.completed);

    if (pendingTasks.length === 0) {
      return 'No Pending Tasks';
    } else if (pendingTasks.length === 1) {
      return '1 Pending Task';
    } else {
      return `${pendingTasks.length} Pending Task${pendingTasks.length > 1 ? 's' : ''}`;
    }
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
      dangerouslySetInnerHTML={{
        __html:
          "<polyline points='3 6 5 6 21 6'/><path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/><line x1='10' y1='11' x2='10' y2='17'/><line x1='14' y1='11' x2='14' y2='17'/>",
      }}
    />
  );

  const CheckIcon = () => (
     <svg
    fill="green"
    height="20"
    width="20"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 300 300"
    xmlSpace="preserve"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M150,0C67.29,0,0,67.29,0,150s67.29,150,150,150s150-67.29,150-150S232.71,0,150,0z M150,270c-66.169,0-120-53.832-120-120 S83.831,30,150,30s120,53.832,120,120S216.168,270,150,270z"></path>
    </g>
  </svg>
  );

  const sortTasks = () => {
    // return [...tasks].sort((a, b) => (a.completed && !b.completed ? 1 : -1));
    return [...tasks].sort((a, b) => {
      // Sort by completion status first
      if (a.completed && !b.completed) return 1; // Completed tasks go down
      if (!a.completed && b.completed) return -1; // Incomplete tasks go up

      // Sort by due date if completion status is the same
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA - dateB; // Closer due dates go up
    });
  };


return (
  <div>
    <h3 className='pendingtasks'>{pendingTasks()}</h3>
    <ul>
    {sortTasks().map((task) => (
        <li key={task.id} className={`task-box ${task.completed ? 'completed' : ''}`}>
        <div className="task-info">
          <div className="task-title"> <b> Title: </b> {task.title}</div>
          {/* Conditionally render description only if it exists */}
          {task.description && <div className="task-description"> <b> Description: </b>{task.description}</div>}
          <div className="task-date"> <b> Date: </b> {formatDate(task.dueDate)}</div>
          <div className="task-status"> <b> Status: </b> {task.completed ? 'Completed' : 'Incomplete'}</div>
        </div>
          <div className="task-buttons">
          <button
              className={`complete-button ${task.completed ? 'completed' : ''}`}
              onClick={() => handleToggleCompletion(task.id, task.completed)}
            >
              {task.completed ? <GreenCheckIcon /> : <CheckIcon className='check-icon'/>}
            </button>
            <button className="delete-button" onClick={() => handleDelete(task.id)}>
                <RedTrashIcon />
            </button>
          </div>
        </li>
      ))}
    </ul>
    <a href="/">Add More Tasks</a>
  </div>
);
};
export default TaskList;



