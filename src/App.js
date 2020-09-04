import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import './App.css';

const TodoApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: '', password: '' });

  const [newTodo, setNewTodo] = useState({
    text: '',
    done: false,
    display: true,
  });
  const [todos, setTodos] = useState([]);
  const [counter, setCounter] = useState(1);

  const [numItemsLeft, setNumItemsLeft] = useState(0);
  const [displayLevel, setDisplayLevel] = useState('all');
  const [showAllDone, setShowAllDone] = useState(true);

  useEffect(() => {
    const uncompletedTodos = todos.filter((todo) => todo.done === false);
    setNumItemsLeft(uncompletedTodos.length);
  }, [todos]);

  const handleChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let todoToAdd = { ...newTodo, id: counter };
    setTodos([...todos, todoToAdd]);
    setCounter((prevCounter) => prevCounter + 1);
    setNewTodo({ text: '', done: false, display: true });
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleCheck = (e) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === Number(e.target.id)) {
        return { ...todo, done: !todo.done };
      } else {
        return todo;
      }
    });

    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => todo.done === false);
    setTodos(updatedTodos);
  };

  const changeDisplay = (level) => {
    setDisplayLevel(level);
    let updatedTodos;
    if (level === 'all') {
      updatedTodos = todos.map((todo) => {
        return { ...todo, display: true };
      });
    } else if (level === 'active') {
      updatedTodos = todos.map((todo) => {
        if (todo.done === false) {
          return { ...todo, display: true };
        } else {
          return { ...todo, display: false };
        }
      });
    } else {
      // level === 'completed'
      updatedTodos = todos.map((todo) => {
        if (todo.done === false) {
          return { ...todo, display: false };
        } else {
          return { ...todo, display: true };
        }
      });
    }
    setTodos(updatedTodos);
  };

  const toggleAllDone = () => {
    const updatedTodos = todos.map((todo) => {
      if (showAllDone) {
        return { ...todo, done: true };
      } else {
        return { ...todo, done: false };
      }
    });
    setTodos(updatedTodos);
    setShowAllDone(!showAllDone);
  };

  const handleLoginChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.username === 'Heather' && user.password === 'fox6tree') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      <h1>todos</h1>

      {!isLoggedIn && (
        <div className="main-box">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              placeholder="username"
              onChange={handleLoginChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              placeholder="password"
              onChange={handleLoginChange}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {isLoggedIn && (
        <div className="main-box">
          <form onSubmit={handleSubmit}>
            <button type="button" onClick={toggleAllDone}>
              {showAllDone ? (
                <span role="img" aria-label="Outbox Tray">
                  📤
                </span>
              ) : (
                <span role="img" aria-label="Inbox Tray">
                  📥
                </span>
              )}
            </button>
            <input
              type="text"
              id="text"
              name="text"
              value={newTodo.text}
              placeholder="What needs to be done?"
              onChange={handleChange}
            />
            <button type="submit">
              <span role="img" aria-label="Writing Hand">
                ✍️
              </span>{' '}
              Add
            </button>
          </form>

          <div className="todo-box">
            {todos
              .filter((todo) => todo.display === true)
              .map((todo) => {
                return (
                  <TodoItem
                    key={`todo${todo.id}`}
                    text={todo.text}
                    handleDelete={handleDelete}
                    id={todo.id}
                    handleCheck={handleCheck}
                    done={todo.done}
                  />
                );
              })}
          </div>

          <div className="control-box">
            <div>
              {numItemsLeft === 1
                ? `${numItemsLeft} item left`
                : `${numItemsLeft} items left`}
            </div>
            <div className="display-options">
              <p
                onClick={() => changeDisplay('all')}
                className={displayLevel === 'all' ? 'selected' : 'not-selected'}
              >
                All
              </p>
              <p
                onClick={() => changeDisplay('active')}
                className={
                  displayLevel === 'active' ? 'selected' : 'not-selected'
                }
              >
                Active
              </p>
              <p
                onClick={() => changeDisplay('completed')}
                className={
                  displayLevel === 'completed' ? 'selected' : 'not-selected'
                }
              >
                Completed
              </p>
            </div>
            <div>
              <p className="clear-completed" onClick={clearCompleted}>
                Clear Completed
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
