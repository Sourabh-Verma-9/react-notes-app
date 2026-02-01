import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [draggingId, setDraggingId] = useState(null);

  const addNote = () => {
    if (!text.trim()) return;

    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: Date.now(),
        content: text,
        x: 50,
        y: 50
      }
    ]);

    setText("");
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggingId === null) return;

      const appRect = document
          .querySelector(".app")
          .getBoundingClientRect();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === draggingId
            ? {
                ...note,
                 x: e.clientX - appRect.left - offset.x,
                 y: e.clientY - appRect.top - offset.y
              }
            : note
        )
      );
    };

    const handleMouseUp = () => {
        setDraggingId(null);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [draggingId]);

  const startDrag = (e, id) => {
    const note = notes.find((n) => n.id === id);
    const appRect = document
      .querySelector(".app")
      .getBoundingClientRect();

    setOffset({
      x: e.clientX - appRect.left - note.x,
      y: e.clientY - appRect.top - note.y
    });

    setDraggingId(id);
  };

  return (
    <div className="app">
      <h1>Notepad App</h1>
      <div className="input-bar">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addNote}>Add</button>
      </div>

      <div className="notes-container">
      {notes.map(note => (
       <div
         key={note.id}
         className="note"
           style={{
             left: note.x,
             top: note.y
           }}
         onMouseDown={(e) => startDrag(e, note.id)}
       >
         {note.content}
       </div>
      ))}
  </div>
    </div>
  );
}

export default App;