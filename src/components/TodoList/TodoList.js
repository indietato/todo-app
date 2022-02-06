import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';
import { FaRegSmile } from 'react-icons/fa';
import emptyList from '../../img/young_and_happy_hfpe.svg';

const TodoList = (props) => {
  let content = (
    <div className={styles['todo-list__empty']}>
      <img src={emptyList} alt="Empty list." />
    </div>
  );

  if (props.items.length) {
    content = props.items.map((item) => (
      <TodoItem
        key={item.id}
        id={item.id}
        text={item.text}
        status={item.status}
        onDelete={props.onDelete}
        onDone={props.onDone}
      />
    ));
  }
  return (
    <div className={styles['todo-list-wrapper']}>
      <ul>{content}</ul>
    </div>
  );
};

export default TodoList;
