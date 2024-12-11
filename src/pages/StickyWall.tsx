import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import {
  selectNotes,
  selectIsLoading,
  selectError,
} from "../redux/stickyWall/stickyWallSelectors";
import { setNotes } from "../redux/stickyWall/stickyWallSlice";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../redux/stickyWall/stickyWallThunks";

export default function StickyWall() {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // const createNewNote = () => {
  //   const newNote = {
  //     id: notes.length + 1,
  //     content: "",
  //   };
  //   dispatch(setNotes([...notes, newNote]));
  // };
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleCreateNote = async () => {
    try {
      const result = await dispatch(createNote("New note")).unwrap();
      dispatch(setNotes([...notes, result]));
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  const handleUpdateNote = async (id: string, content: string) => {
    try {
      const updatedNote = await updateNote(id, content);
      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, content: updatedNote.content } : note
      );
      dispatch(setNotes(updatedNotes));
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      const remainingNotes = notes.filter((note) => note._id !== id);
      dispatch(setNotes(remainingNotes));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <>
      <div className="text-gray-900 dark:text-white p-4 md:ml-64 mt-[60px]">
        <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
          Sticky Wall
        </div>
        {error && <div className="text-red-500 mb-4">Error: {error}</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-wrap justify-center text-gray-900">
            {notes?.map((note) => (
              <div key={note._id} className="relative group">
                <textarea
                  value={note.content}
                  onChange={(e) => handleUpdateNote(note._id, e.target.value)}
                  // onBlur={()=>{createNoteOnDB(note.content)}}
                  className="text-[20px] font-gloria leading-[1.5] border-0 rounded-[3px] bg-[linear-gradient(#f9efaf,#f7e98d)] shadow-[0_4px_6px_rgba(0,0,0,0.1)] overflow-hidden hover:overflow-auto transition-all duration-500 ease-in-out subpixel-antialiased max-w-[520px] max-h-[250px] hover:shadow-[0_5px_8px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_5px_8px_rgba(255,255,255,0.25)] focus:shadow-[0_5px_12px_rgba(0,0,0,0.2)] outline-none w-[250px] h-[250px] m-[0px_20px_20px_0px] p-[25px_25px_40px]"
                />
                {/* (e) => updateNoteContent(note.id, e.target.value) */}
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="hidden group-hover:block absolute top-0 right-0 z-50 mr-[20px]"
                >
                  <p className="text-xl">
                    <MdDelete />
                  </p>
                </button>
              </div>
            ))}
            <div
              onClick={handleCreateNote}
              className="select-none rounded-[20px] text-center border-[15px] border-[rgba(0,0,0,0.1)] cursor-pointer text-[rgba(0,0,0,0.1)] text-[220px] font-[sans-serif] leading-[185px] hover:border-[rgba(0,0,0,0.2)] hover:text-[rgba(0,0,0,0.2)] w-[250px] h-[250px] p-[20px]"
            >
              +
            </div>
          </div>
        )}
      </div>
    </>
  );
}
