
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';

// Enable sending cookies with every request
axios.defaults.withCredentials = true;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch the list of to-do items from your API or database when authenticated
      axios.get('http://localhost:8080/api/todos', {
        withCredentials: true
      })
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          console.error('Error fetching todos:', error);
        });
    }
  }, [isAuthenticated]);

  const handleCreateTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
    setShowTaskForm(false); // Switch to the task list view
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    axios.post('http://localhost:8080/api/users/authentication/logout', {}, {
      withCredentials: true
    }).catch((error) => console.error('Logout failed:', error));

    setIsAuthenticated(false);
    setShowTaskForm(true);
  };

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={isAuthenticated ? (
              <>
                {showTaskForm ? (
                  <TaskForm onCreateTodo={handleCreateTodo} />
                ) : (
                  <TaskList items={todos} />
                )}
                <div className="button-container">

                <button
                  onClick={() => setShowTaskForm(!showTaskForm)}
                  className="button button-primary"
                  style={{ marginTop: "20px" }}
                >
                  {showTaskForm ? "Go to Task List" : "Add New Task"}
                </button>
                </div>

                <button onClick={handleLogout} className="button button-secondary"
                style={{ marginTop: "70px" }}>Logout</button>
              </>
            ) : (
              <Navigate to="/login" />
            )} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todoform" element={<TaskForm />} />
            <Route path="/todolist" element={<TaskList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
