import { useCallback, useEffect, useRef } from "react";
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

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function StickyWall() {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // Create a ref to store pending updates
  const pendingUpdates = useRef<{[key: string]: string}>({});

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

  const debouncedUpdateNote = useCallback(
    debounce(async () => {
      try {
        // Get all pending updates
        const updates = pendingUpdates.current;
        
        // Clear pending updates
        pendingUpdates.current = {};

        // Process all pending updates
        for (const [id, content] of Object.entries(updates)) {
          await updateNote(id, content);
        }
        console.log("Database updated with all pending changes");
      } catch (error) {
        console.error("Failed to update notes:", error);
      }
    }, 5000),
    []
  );

  const handleUpdateNote = (id: string, content: string) => {
    const currentNote = notes.find((note) => note._id === id);
    if (currentNote && currentNote.content !== content) {
      // Update local state immediately
      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, content } : note
      );
      dispatch(setNotes(updatedNotes));

      // Queue update for database
      pendingUpdates.current[id] = content;
      debouncedUpdateNote();
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!id) {
      console.error("Note ID is undefined");
      return;
    }
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
      <div className="p-4 md:ml-64 mt-[60px]">
        <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
          Sticky Wall
        </div>
        {error && <div className="text-red-500 mb-4">Error: {error}</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-wrap justify-center text-gray-900">
            {notes.length === 0 && (
              <div className="w-full text-center text-gray-900 dark:text-white mb-4">
                There are no notes :( Create one by using the + button
              </div>
            )}
            {notes?.map((note) => (
              <div key={note._id} className="relative group">
                <textarea
                  value={note.content}
                  onChange={(e) => handleUpdateNote(note._id, e.target.value)}
                  // onChange={(e) => handleUpdateNote(note._id, e.target.value)}
                  onBlur={(e) => {
                    const currentNote = notes.find(
                      (note) => note._id === note._id
                    );
                    if (currentNote && currentNote.content !== e.target.value) {
                      debouncedUpdateNote(note._id, e.target.value);
                    }
                  }}
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
