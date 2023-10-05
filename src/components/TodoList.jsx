import React from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

const TodoList = ({ items }) => {
  return (
    <div className={styles['todo-list']}>
     <h2>Todo List</h2> 
      <ul>
        {items.map(item => (
          <TodoItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
