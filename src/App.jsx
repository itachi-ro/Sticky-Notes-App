import NoteProvider from "./Context/NoteContext";
import NotesPage from "./pages/NotesPage";

function App() {
  return (
    <div id="app">
      <NoteProvider>
        <NotesPage />
      </NoteProvider>
    </div>
  );
}

export default App;
