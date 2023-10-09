import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS files here
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';


// function App() {
//   const [todos, setTodos] = useState([]);

//   // Fetch the to-do items from your backend API here using useEffect

//   // useEffect to fetch data (replace with your API endpoint)
//   useEffect(() => {
//     fetch('/api/todos') // Replace with your API endpoint
//       .then((response) => response.json())
//       .then((data) => setTodos(data));
//   }, []);

//   const createTodo = (title) => {
//     // Send a POST request to your backend API to create a new to-do item
//     // Update the 'todos' state with the newly created item
//   };
const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch the list of to-do items from your API or database
    axios.get('http://localhost:8080/api/todos') // Replace with your actual API endpoint
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCreateTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };


  return (
    // <div className="App">
    //   <main>
    //     <TaskForm onCreateTodo={handleCreateTodo} />
    //     <TaskList items={todos} />
    //   </main>
    // </div>
    <Router>
      <div className="App">
       <Routes>
        <Route exact path="/" element={<TaskForm />}></Route>
        <Route exact path='/tasklist' element={<TaskList />}></Route>
       </Routes>
      </div>
    </Router>
  );
}

export default App;
