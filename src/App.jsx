import React, { useRef, useState } from 'react';
import ContentEditable from "react-contenteditable";
import './App.css';
const App = () => {
  const macroses = [
    { id: 1, name: 'Hotline ', unicode: "\ud01e" },
    { id: 2, name: 'Epicentre', unicode: "\ud01f" },
    { id: 3, name: 'DHL', unicode: "\ud020" },
    { id: 4, name: 'Nova Poshta', unicode: "\ud028" },
  ];
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("Начальный текст");
  const contentEditable = useRef(null);
  const savedSelection = useRef(null);

  const handleBlur = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    savedSelection.current = selection.getRangeAt(0);
  };

  const handleMacroClick = (macro) => {
    if (!savedSelection.current) return;

    const range = savedSelection.current;
    const span = document.createElement("span");
    span.className = "lpcrm-fonts";
    span.textContent = macro.unicode;
    range.insertNode(span);
    range.setStartAfter(span);

    contentEditable.current.focus();

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    savedSelection.current = null;
  };
  console.log(text);
  return (
    <div className='App'>
      <ContentEditable
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        className='editable'
        innerRef={contentEditable}
        html={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
      />
      {macroses.map((macro) => (
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
          key={macro.id}
          onClick={() => handleMacroClick(macro)}
        >
          {macro.name}
        </div>
      ))}
    </div>
  );
};


export default App;
