import React from 'react';

const TodoItem = (props) => {
  return (
    <div className="todo-item">
      {props.done ? (
        <p className="todo-circle" id={props.id} onClick={props.handleCheck}>
          ✔️
        </p>
      ) : (
        <p className="todo-circle" id={props.id} onClick={props.handleCheck}>
          ❔
        </p>
      )}
      <p className={props.done ? 'completed' : 'not-completed'}>{props.text}</p>
      <p className="delete-button" onClick={() => props.handleDelete(props.id)}>
        ❌
      </p>
    </div>
  );
};

export default TodoItem;
