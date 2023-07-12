import React, {useState} from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import Column from "./components/Column.jsx";
import './App.css'

const App = () => {
  const [columns, setColumns] = useState([
    {id: 'notStartedColumn', title: 'NOT STARTED', todos: []},
    {id: 'completedColumn', title: 'COMPLETED STARTED', todos: []}
  ])
  const onButtonClick = ((event) => {
    setColumns(prev => prev.map(column => {
      if (column.id === 'notStartedColumn') {
        return ({
          ...column,
          todos: [{id: Date.now(), description: Date.now()},...column.todos]
        })
      } else {
        return column
      }
    }))
  });

  return (
    <DragDropContext>
      <div className="App">
        <button

          onClick={onButtonClick}>++++</button>
        {columns.map((column) => (
          <Column columnData={column} key={column.id}/>
        ))}
      </div>
    </DragDropContext>
  );
};

export default App;