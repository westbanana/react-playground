import React from 'react';
import {Droppable} from "react-beautiful-dnd";
import Todo from "./Todo.jsx";

const Column = ({columnData}) => {
  return (
      <Droppable droppableId={columnData.id}>
        {(provided, snapshot) => (
          <div
            className={`
              column-container
              ${snapshot.isDraggingOver ? 'dragactive' : ''}
              `}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span>{columnData.title}</span>
            {columnData.todos.map((todo, index) => (
              <Todo
                todo={todo}
                index={index}
              />
            ))}
          </div>
        )}
      </Droppable>
  );
};

export default Column;