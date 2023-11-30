import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';


const App = () => {
  const [todos, setTodos] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(true);

  useEffect(() => {
    // Fetch the list of to-do items from your API or database
    axios.get('http://localhost:8080/api/todos')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const handleCreateTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
    setShowTaskForm(false); // Switch to the task list view
  };


return (
  <Router>
    <div className="App">
      <main>
        {showTaskForm ? (
          <TaskForm onCreateTodo={handleCreateTodo} />
        ) : (
          <TaskList items={todos} />
        )}
      </main>
    </div>
  </Router>
);
}




export default App;
