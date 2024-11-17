import { useDispatch, useSelector } from "react-redux";
import { selectNotes } from "../redux/stickyWall/stickyWallSelectors";
import { setNotes } from "../redux/stickyWall/stickyWallSlice";

export default function StickyWall() {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);

  const createNewNote = () => {
    const newNote = {
      id: notes.length + 1,
      content: "",
    };
    dispatch(setNotes([...notes, newNote]));
  };

  const updateNoteContent = (id, content) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content } : note
    );
    dispatch(setNotes(updatedNotes));
  };

  return (
    <>
      <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
        Sticky Wall
      </div>
      <div className="flex flex-wrap justify-center text-gray-900">
        {notes.map((note) => (
          <textarea
            key={note.id}
            value={note.content}
            onChange={(e) => updateNoteContent(note.id, e.target.value)}
            className="text-[20px] font-gloria leading-[1.5] border-0 rounded-[3px] bg-[linear-gradient(#f9efaf,#f7e98d)] shadow-[0_4px_6px_rgba(0,0,0,0.1)] overflow-hidden hover:overflow-auto transition-shadow duration-500 ease-in-out subpixel-antialiased max-w-[520px] max-h-[250px] hover:shadow-[0_5px_8px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_5px_8px_rgba(255,255,255,0.25)] focus:shadow-[0_5px_12px_rgba(0,0,0,0.2)] outline-none w-[250px] h-[250px] m-[0px_20px_20px_0px] p-[25px_25px_40px]"
          />
        ))}
        <div
          id="create"
          onClick={createNewNote}
          className="select-none rounded-[20px] text-center border-[15px] border-[rgba(0,0,0,0.1)] cursor-pointer text-[rgba(0,0,0,0.1)] text-[220px] font-[sans-serif] leading-[185px] hover:border-[rgba(0,0,0,0.2)] hover:text-[rgba(0,0,0,0.2)] w-[250px] h-[250px] p-[20px]"
        >
          +
        </div>
      </div>
    </>
  );
}
