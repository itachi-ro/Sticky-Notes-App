import NoteCard from "../components/Notecard";
import { useContext } from "react";
import { NoteContext } from "../Context/NoteContext";
import Controls from "../components/Controls";
// import { fakeData as notes } from "../assets/fakeData"

const NotesPage = () => {
  const { notes } = useContext(NoteContext);
  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
      <Controls />
    </div>
  );
};

export default NotesPage;
