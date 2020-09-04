import React from 'react';

const TodoItem = (props) => {
  return (
    <div className="todo-item">
      {props.done ? (
        <p className="todo-circle" id={props.id} onClick={props.handleCheck}>
          <span
            role="img"
            aria-label="Check Mark"
            id={props.id}
            onClick={props.handleCheck}
          >
            ✔️
          </span>
        </p>
      ) : (
        <p className="todo-circle" id={props.id} onClick={props.handleCheck}>
          <span
            role="img"
            aria-label="White Question Mark Ornament"
            id={props.id}
            onClick={props.handleCheck}
          >
            ❔
          </span>
        </p>
      )}
      <p className={props.done ? 'completed' : 'not-completed'}>{props.text}</p>
      <p className="delete-button" onClick={() => props.handleDelete(props.id)}>
        <span role="img" aria-label="Cross Mark">
          ❌
        </span>
      </p>
    </div>
  );
};

export default TodoItem;
