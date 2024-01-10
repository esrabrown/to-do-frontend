import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


// import { Link } from 'react-router-dom';

const  TaskForm = ({ onCreateTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Task title cannot be empty!');
      return;
    }

    axios.post('http://localhost:8080/api/create', { title, description, dueDate: selectedDate, completed: false })
      .then((response) => {
        onCreateTodo(response.data);
        setTitle('');
        setDescription('');
        setSelectedDate('');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className='container'>
     <div>
      <div className='h1-title'> To-Do List </div> <br></br>
      <svg className='svg-form'
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 508 508"
        xmlSpace="preserve"
        fill="#000000"
        width="150"
        height="150"
      >
       <circle style={{ fill: '#90DFAA' }} cx="254" cy="254" r="254"></circle>
       <path style={{ fill: '#CED5E0' }} d="M388,410.7H120c-1.7,0-3-1.4-3-3V100.4c0-1.7,1.4-3,3-3h268c1.7,0,3,1.4,3,3v307.3 C391,409.3,389.7,410.7,388,410.7z"></path>
       <path style={{ fill: '#FFFFFF' }} d="M117,109.4v289.2c0,6.7,5.4,12,12,12h214v-36c0-6.6,5.4-12,12-12h36V109.4c0-6.7-5.4-12-12-12H129 C122.3,97.3,117,102.7,117,109.4z"></path>
       <path style={{ fill: '#E6E9EE' }} d="M343,410.7l48-48h-36c-6.6,0-12,5.4-12,12V410.7z"></path>
       <rect x="129.3" y="110.8" style={{ fill: '#CED5E0' }} width="16.1" height="7.5"></rect>
       <rect x="132.3" y="82.3" style={{ fill: '#324A5E' }} width="10.1" height="32.3"></rect>
       <rect x="162.6" y="110.8" style={{ fill: '#CED5E0' }} width="16.1" height="7.5"></rect>
       <rect x="165.6" y="82.3" style={{ fill: '#324A5E' }} width="10.1" height="32.3"></rect>
       <rect x="196" y="110.8" style={{ fill: '#CED5E0' }} width="16.1" height="7.5"></rect>
       <rect x="198.9" y="82.3" style={{ fill: '#324A5E' }} width="10.1" height="32.3"></rect>
       <rect x="229.3" y="110.8" style={{ fill: '#CED5E0' }} width="16.1" height="7.5"></rect>
       <rect x="232.3" y="82.3" style={{ fill: '#324A5E' }} width="10.1" height="32.3"></rect>
       <rect x="262.6" y="110.8" style={{ fill: '#CED5E0' }} width="16.1" height="7.5"></rect>
       <rect x="265.6" y="82.3" style={{ fill: '#324A5E' }} width="10.1" height="32.3"></rect>
       <rect x="296" y="110.8" style={{ fill: '#CED5E0' }} width="16.1" height="7.5"></rect>
       <rect x="298.9" y="82.3" style={{ fill: '#324A5E' }} width="10.1" height="32.3"></rect>
       <rect x="329.3" y="110.8" style={{ fill: '#CED5E0' }} width="16.1" height="7.5"></rect>
       <rect x="332.3" y="82.3" style={{ fill: '#324A5E' }} width="10.1" height="32.3"></rect>
       <rect x="362.6" y="110.8" style={{ fill: '#CED5E0' }} width="16.1" height="7.5"></rect>
       <rect x="365.6" y="82.3" style={{ fill: '#324A5E' }} width="10.1" height="32.3"></rect>
       <g>
       <path style={{ fill: '#E6E9EE' }} d="M177,214.4h-31.1c-4.1,0-7.5-3.4-7.5-7.5v-31.1c0-4.1,3.4-7.5,7.5-7.5H177c4.1,0,7.5,3.4,7.5,7.5 V207C184.4,211.1,181.1,214.4,177,214.4z M146.4,206.5h30.2v-30.2h-30.2V206.5z"></path>
       <path style={{ fill: '#E6E9EE' }} d="M177,288.7h-31.1c-4.1,0-7.5-3.4-7.5-7.5v-31.1c0-4.1,3.4-7.5,7.5-7.5H177c4.1,0,7.5,3.4,7.5,7.5 v31.1C184.4,285.3,181.1,288.7,177,288.7z M146.4,280.7h30.2v-30.2h-30.2V280.7z"></path>
       <path style={{ fill: '#E6E9EE' }} d="M177,362.9h-31.1c-4.1,0-7.5-3.4-7.5-7.5v-31.1c0-4.1,3.4-7.5,7.5-7.5H177c4.1,0,7.5,3.4,7.5,7.5 v31.1C184.4,359.5,181.1,362.9,177,362.9z M146.4,355h30.2v-30.2h-30.2V355z"></path>
       </g>
       <g>
       <path style={{ fill: '#FF7058' }} d="M159.5,198.3c0.7,0.9,1.7,1.5,2.9,1.6c0.1,0,0.2,0,0.3,0c1.1,0,2.1-0.4,2.8-1.2l41.1-41.1 c1.6-1.6,1.6-4.1,0-5.6c-1.6-1.6-4.1-1.6-5.6,0l-37.9,37.9l-5.6-7.7c-1.3-1.8-3.8-2.2-5.5-0.9c-1.8,1.3-2.1,3.8-0.9,5.5 L159.5,198.3z"></path>
       <path style={{ fill: '#FF7058' }} d="M201,226.2l-37.9,37.9l-5.6-7.7c-1.3-1.8-3.8-2.2-5.5-0.9c-1.8,1.3-2.1,3.8-0.9,5.5l8.4,11.4 c0.7,0.9,1.7,1.5,2.9,1.6c0.1,0,0.2,0,0.3,0c1.1,0,2.1-0.4,2.8-1.2l41.1-41.1c1.6-1.6,1.6-4.1,0-5.6 C205.1,224.7,202.6,224.7,201,226.2z"></path>
       <path style={{ fill: '#FF7058' }} d="M201,300.5l-37.9,37.9l-5.6-7.7c-1.3-1.8-3.8-2.2-5.5-0.9c-1.8,1.3-2.1,3.8-0.9,5.5l8.4,11.4 c0.7,0.9,1.7,1.5,2.9,1.6c0.1,0,0.2,0,0.3,0c1.1,0,2.1-0.4,2.8-1.2l41.1-41.1c1.6-1.6,1.6-4.1,0-5.6 C205.1,298.9,202.6,298.9,201,300.5z"></path>
       </g>
       <g>
        <rect x="216.6" y="175.4" style={{ fill: '#84DBFF' }} width="116.9" height="9.1"></rect>
        <rect x="216.6" y="198.4" style={{ fill: '#84DBFF' }} width="70.6" height="9.1"></rect>
        <rect x="216.6" y="249.6" style={{ fill: '#84DBFF' }} width="116.9" height="9.1"></rect>
        <rect x="216.6" y="272.6" style={{ fill: '#84DBFF' }} width="70.6" height="9.1"></rect>
        <rect x="216.6" y="323.8" style={{ fill: '#84DBFF' }} width="116.9" height="9.1"></rect>
        <rect x="216.6" y="346.8" style={{ fill: '#84DBFF' }} width="70.6" height="9.1"></rect>
        </g>
      </svg>

        </div>
      <form className='task-form' onSubmit={handleSubmit}>
        <div className='form-section'>
          <label>Task Title:</label>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
         </div>
         <div className='form-section'>
          <label>Task Description:</label>
          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-section'>
          <label>Date:</label>
          <DatePicker
            selected={selectedDate} className='datepicker-input'
            onChange={(date) => setSelectedDate(date)}
          />
        </div>
        <div className='form-section'>
        <button type="submit" className='button'>Add Task</button>
        </div>
      </form>
      {/* <Link to="/tasklist">Go to Task List</Link> */}
    </div>
  );
};

export default TaskForm;
