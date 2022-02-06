import React from 'react';

import { FaTrash, FaEdit, FaCircle } from 'react-icons/fa';
import styles from './TodoItem.module.css';

const TodoItem = (props) => {
  const removeItemHandler = () => {
    props.onDelete(props.id);
  };
  const updateItemHandler = () => {
    props.onDone(props.id);
  };

  let button = <button onClick={updateItemHandler}></button>;

  if (props.status) {
    button = (
      <button onClick={updateItemHandler} className={styles['done-button']}>
        &#10003;
      </button>
    );
  }

  return (
    <li className={styles['todo-item']}>
      <div className={styles['todo-item__check']}>{button}</div>
      <div
        onClick={updateItemHandler}
        className={`${styles['todo-item__text']} ${
          props.status && styles['done-text']
        }`}
      >
        {props.text}
      </div>
      <div className={styles['todo-item__actions']}>
        {/* <FaEdit /> */}
        <FaTrash onClick={removeItemHandler} />
      </div>
    </li>
  );
};

export default TodoItem;
