import React, { useRef, useState } from 'react';
import './App.css';

const App = () => {
  const divRef = useRef(null);
  const [caretPosition, setCaretPosition] = useState(0);

  const macroses = [
    { id: 1, name: 'Hotline ', unicode: "\ud01e" },
    { id: 2, name: 'Epicentre', unicode: "\ud01f" },
    { id: 3, name: 'DHL', unicode: "\ud020" },
    { id: 4, name: 'Nova Poshta', unicode: "\ud028" },
  ];
  console.log(caretPosition);
  const getCaretPosition = () => {
    let position = 0;
    const selection = window.getSelection();
    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(divRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      position = preCaretRange.toString().length;

      // Handle cases where the divRef element contains multiple child nodes
      let container = range.endContainer;
      while (container !== divRef.current) {
        for (let i = 0; i < container.previousSibling; i++) {
          position += container.previousSibling[i].textContent.length;
        }
        container = container.parentNode;
      }

      // Handle cases where the caret is at the end of the divRef element
      if (range.endContainer === divRef.current && range.endOffset === divRef.current.childNodes.length) {
        position += divRef.current.lastChild.textContent.length;
      }
    }
    return position;
  };



  const handleMouseEnter = () => {
    divRef.current.focus();

    // Restore the caret position
    const selection = window.getSelection();
    const range = document.createRange();

    // Check if the divRef element is empty
    if (divRef.current.firstChild === null) {
      // Insert a text node into the divRef element
      divRef.current.appendChild(document.createTextNode(''));
    }

    range.setStart(divRef.current.firstChild, caretPosition);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const macrosClick = (unicode) => {
    // Create a new span element
    const newSpan = document.createElement('span');
    newSpan.className = 'lpcrm-fonts';
    newSpan.textContent = `${unicode}`;

    // Insert the new span element at the last known caret position
    const selection = window.getSelection();
    const range = document.createRange();

    // Check if the divRef element is empty
    if (divRef.current.firstChild === null) {
      // Insert a text node into the divRef element
      divRef.current.appendChild(document.createTextNode(''));
    }

    range.setStart(divRef.current.firstChild, caretPosition);
    range.collapse(true);
    range.insertNode(newSpan);

    // Move the caret after the inserted node
    range.setStartAfter(newSpan);
    range.setEndAfter(newSpan);
    selection.removeAllRanges();
    selection.addRange(range);
  };


  const handleMouseLeave = () => {
    setCaretPosition(getCaretPosition());
    divRef.current.blur();
  }

  const handleInput = () => {
    setCaretPosition(getCaretPosition());
  };

  const handleBlur = () => {
    setCaretPosition(getCaretPosition());
  };

  return (
    <div>
      <div
        style={{
          height: '200px',
          width: '400px',
          border: '1px solid black',
          textAlign: 'left',
        }}
        contentEditable={true}
        ref={divRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onInput={handleInput}
        onBlur={handleBlur}
      />
      {macroses.map((macros) => (
        <div
          style={{
            border: '1px solid lightGrey',
            padding: '10px',
            borderRadius: '100px',
            textAlign: 'center',
            cursor: 'pointer',
            margin: '10px 0',
            width: '100px',
          }}
          onClick={() => macrosClick(macros.unicode)}
          key={macros.id}
        >
          {macros.name}
        </div>
      ))}      <p>Caret Position: {caretPosition}</p>
    </div>
  );
};

export default App;
