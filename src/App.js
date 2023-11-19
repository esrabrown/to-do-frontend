import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS files here
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

  // const handleCreateTodo = (newTodo) => {
  //   // setTodos([...todos, newTodo]);
  //   setTodos((prevTodos) => [...prevTodos, newTodo]);
  //   console.log('Updated todos:', todos);
  // };
  const handleCreateTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
    setShowTaskForm(false); // Switch to the task list view
  };



//   return (
//     <div className="App">
//        <main>
//         {showTaskForm ? (
//           <TaskForm onCreateTodo={handleCreateTodo} />
//         ) : (
//           <TaskList items={todos} />
//         )}
//       </main>
//     </div>
//     // <Router>
//     //   <div className="App">
//     //    <Routes>
//     //     <Route exact path="/" element={<TaskForm />}></Route>
//     //     <Route exact path='/tasklist' element={<TaskList />}></Route>
//     //    </Routes>
//     //   </div>
//     // </Router>
//   );
// }

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
