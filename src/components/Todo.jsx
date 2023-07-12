import React from 'react';
import {Draggable} from "react-beautiful-dnd";

const Todo = ({
  todo,
  index
}) => {
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todo ${snapshot.isDragging ? "drag" : ""}`}
        >
        <span className="todo_description">
          {todo.description}
        </span>
          <button className="delete_todo-button">X</button>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;