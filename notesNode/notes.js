
const fs = require("fs");
const notesFile="notes_data.json";
/*
let notes=[];
let note={
  title:null,
  body:null
}*/

//console.log("Starting notes.js");

const checkForDuplicateTitle = (notes, title) => {
  let dup = notes.filter ((note)=>{
    return note.title===title;
  });
  if (dup.length > 0){
    return true;
  }else{
    return false;
  }
}

const noteMan = {
  logNote:(note)=>{
    debugger;
    console.log("Note title: ", note.title);
    console.log("Note body: ", note.body);
  },
  fetchNotes:()=>{
    try{
      let str = fs.readFileSync(notesFile);
      notes = JSON.parse(str);
      console.log("loaded notes...", notes);
      return notes;
    }catch(e){
      //return e;
      console.log("Failed to fetch notes...", e);
    }
  },
  saveNotes:(notes)=>{
    try{
      fs.writeFileSync(notesFile, JSON.stringify(notes));
      return true;
    }catch(e){
      console.log("Failed to save notes...", e);
      //return e;
    }
  },
  /**
   * Add note to collection
   * @param title: string, note title
   * @param body: string, note body
   */
  addNote:({title, body})=>{
    let notes = noteMan.fetchNotes();
    if (checkForDuplicateTitle(notes, title)){
      console.log("Duplicated note with title...", title);
    }else{
      notes.push({
        title: title,
        body: body 
      });
      if (noteMan.saveNotes(notes)){
        console.log("Note saved...", title);
        return true;
      };
    }
  },
  getAll:()=>{
    //console.log("Get all notes");
    let notes = noteMan.fetchNotes();
    return notes;
  },
  getNote:(title)=>{
    //console.log("Read note...", title);
    let notes = noteMan.fetchNotes();
    let found = notes.filter((note)=>{
      return note.title===title
    });
    return found[0];
  },
  removeNote:(title)=>{
    //console.log("Remove note...", title);
    let notes = noteMan.fetchNotes();
    let newNotes = notes.filter((note)=>{
      return note.title!=title
    });

    if (notes.length > newNotes.length){
      console.log("Removed notes...", notes.length - newNotes.length);
      noteMan.saveNotes(newNotes);
    } else {
      console.log("Note not found");
    }
  }
}

module.exports = noteMan;