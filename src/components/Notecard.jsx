import { useRef, useEffect, useState, useContext } from "react";
import DeleteButton from ".//DeleteButton";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import { db } from "../appwrite/databases";
import Spinner from "../icons/Spinner";
import { NoteContext } from "../Context/NoteContext";

const Notecard = ({ note }) => {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const [saving, setSaving] = useState(false);
  const { setSelectedNote } = useContext(NoteContext);

  const body = bodyParser(note.body);
  const colors = JSON.parse(note.colors);

  let mouseStartPos = { x: 0, y: 0 };

  const cardRef = useRef(null);
  const textAreaRef = useRef(null);
  const keyUpTimer = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  const handleKeyUp = async () => {
    //1 - Initiate "saving" state
    setSaving(true);

    //2 - If we have a timer id, clear it so we can add another
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    //3 - Set timer to trigger save in 2 second
    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  const mouseDown = (e) => {
    if (e.target.className === "card-header") {
      setZIndex(cardRef.current);

      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      setSelectedNote(note);
    }
  };

  const mouseMove = (e) => {
    //1 - Calculate move direction
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    //2 - Update start positoin for next move
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    //3 - Update card top and left positon
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        <DeleteButton noteId={note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
          onKeyUp={handleKeyUp}
        ></textarea>
      </div>
    </div>
  );
};

export default Notecard;
