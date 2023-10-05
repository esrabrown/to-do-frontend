import React from 'react';
import styles from './TodoItem.module.css';

const TodoItem = ({ item }) => {
  return (
    <li className={`${styles['todo-item']} ${item.completed ? styles['completed'] : ''}`}>
      <input type="checkbox" checked={item.completed} readOnly />
      <span>{item.title}</span>
      <button>Delete</button>
    </li>
  );
};

export default TodoItem;
