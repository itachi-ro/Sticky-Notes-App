import { useContext } from "react";
import { db } from "../appwrite/databases";
import Trash from "../icons/Trash";
import { NoteContext } from "../Context/NoteContext";

const DeleteButton = ({ noteId }) => {
  const { setNotes } = useContext(NoteContext);

  const handleDelete = async (e) => {
    db.notes.delete(noteId); // deleting note database
    setNotes(
      (prevState) => prevState.filter((note) => note.$id !== noteId) // removing note from UI
    );
  };

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
