import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';

import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);
  const todosCollectionRef = collection(db, 'todos');

  const getTodos = async () => {
    const data = await getDocs(todosCollectionRef);
    setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addItemHandler = async (text) => {
    await addDoc(todosCollectionRef, { status: false, text });
    getTodos();
  };

  const removeItemHandler = async (id) => {
    setTodoList((preveItems) => {
      const updatedTodoList = preveItems.filter((item) => item.id !== id);
      return updatedTodoList;
    });
    const todoDoc = doc(db, 'todos', id);
    await deleteDoc(todoDoc);
    getTodos();
  };

  const changeStatusHandler = async (id) => {
    setTodoList((preveItems) => {
      const updatedTodoList = preveItems.map((item) => {
        if (item.id === id) {
          item['status'] = item['status'] ? false : true;
          return item;
        }
        return item;
      });
      return updatedTodoList;
    });
    const changeStatus = {};
    const todoDoc = doc(db, 'todos', id);
    const todoDocSnap = await getDoc(todoDoc);
    changeStatus.status = todoDocSnap.data().status ? false : true;
    await updateDoc(todoDoc, changeStatus);
    getTodos();
  };

  return (
    <div>
      <TodoForm onAddItem={addItemHandler} />
      <TodoList
        items={todoList}
        onDelete={removeItemHandler}
        onDone={changeStatusHandler}
      />
    </div>
  );
}

export default App;
