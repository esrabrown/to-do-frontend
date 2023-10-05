import React, { useState } from 'react';
import styles from './TodoForm.module.css';

const TodoForm = ({ onCreateTodo }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    onCreateTodo(title);
    setTitle('');
  };

  return (
    <form className={styles['todo-form']} onSubmit={handleSubmit}>
      {}
      <input
        type="text"
        placeholder="Add a new to-do..."
        value={title}
        onChange={handleTitleChange}
        className={styles['input']}
      />
      <button type="submit" className={styles['button']}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;
