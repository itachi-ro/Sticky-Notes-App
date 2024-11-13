import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { db } from "../appwrite/databases";
import { useContext, useRef } from "react";
import { NoteContext } from "../Context/NoteContext";

const AddButton = () => {
  
  const startingPos = useRef(10);
  const { setNotes } = useContext(NoteContext);

  const addNotes = async () => {
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      colors: JSON.stringify(colors[0]),
    };

    //As a note is added we will also increment the starting position to ensure that the next note wont overlap the previously created note.
    startingPos.current += 10;

    const response = await db.notes.create(payload);
    setNotes((preState) => [response, ...preState]);
  };

  return (
    <div id="add-btn" onClick={addNotes}>
      <Plus />
    </div>
  );
};

export default AddButton;
