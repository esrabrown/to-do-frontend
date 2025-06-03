
import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

const TaskForm = ({ onCreateTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Task title cannot be empty!');
      return;
    }

    const todoData = {
      title,
      description,
      dueDate: selectedDate ? selectedDate.toISOString() : null,
      completed: false,
    };

    axios.post('http://localhost:8080/api/todos', todoData, { withCredentials: true })
      .then((response) => {
        onCreateTodo(response.data);
        setTitle('');
        setDescription('');
        setSelectedDate(null);
      })
      .catch((error) => {
        console.error(error);
        alert("Error creating task. Make sure you're logged in.");
      });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className='container'>
      <div>
        <div className='h1-title'> To-Do List </div><br />
        {/* Your SVG graphic here (omitted for brevity) */}
      </div>

      <form className='task-form' onSubmit={handleSubmit}>
        <div className='form-section'>
          <label>Task Title:</label>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(capitalizeFirstLetter(e.target.value))}
          />
        </div>

        <div className='form-section'>
          <label>Task Description:</label>
          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(capitalizeFirstLetter(e.target.value))}
          />
        </div>

        <div className='form-section'>
          <label>Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className='datepicker-input'
          />
        </div>

        <div className='form-section'>
          <button type="submit" className='button'>Add Task</button>
        </div>
      </form>

    </div>
  );
};

export default TaskForm;
