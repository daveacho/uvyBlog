import Note from "./Note"

export default function NoteContainer ({filteredNotes}) {

    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-7">
              {filteredNotes.map((note, i) => (<Note note={note} key={i} />))}
           </div>
  }

 // 
 //<div className="p-7 flex flex-wrap gap-6 sm:items-center sm:justify-center">