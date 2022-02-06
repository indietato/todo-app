import React, { useState } from 'react';

import styles from './TodoForm.module.css';

const TodoForm = (props) => {
  const [text, setText] = useState('');

  const textHandler = (event) => {
    setText(event.target.value);
  };

  const todoFormHandler = (event) => {
    event.preventDefault();
    props.onAddItem(text);
    setText('');
  };

  return (
    <div className={styles['todo-form-wrapper']}>
      <form onSubmit={todoFormHandler} className={styles['todo-form']}>
        <div className={styles['todo-from__group']}>
          <label>Add Todo</label>
          <input type="text" value={text} onChange={textHandler} required />
        </div>
        <div className={styles['todo-form__button-group']}>
          <button type="submit">+</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
