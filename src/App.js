// app.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS files here
import './components/TodoForm.module.css';
import  './components/TodoList.module.css';
import  './components/TodoItem.module.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';


function App() {
  const [todos, setTodos] = useState([]);

  // Fetch the to-do items from your backend API here using useEffect

  // useEffect to fetch data (replace with your API endpoint)
  useEffect(() => {
    fetch('/api/todos') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const createTodo = (title) => {
    // Send a POST request to your backend API to create a new to-do item
    // Update the 'todos' state with the newly created item
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To - Do</h1>
      </header>
      <main>
        <TodoForm onCreateTodo={createTodo} />
        <TodoList items={todos} />
      </main>
    </div>
  );
}

export default App;
