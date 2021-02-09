const chalk= require('chalk');
const fs= require('fs');
const loadNotes=()=>{
 try {return JSON.parse(fs.readFileSync('notes.json').toString());} 
 catch (error) {return [];}}

const saveNotes=(notes)=>
{ try {
        const notesJSON= JSON.stringify(notes);
        fs.writeFileSync('notes.json',notesJSON);
    } 
  catch (error) { console.log(error);}}

 const addNote=(title,body)=>
{ const notes=loadNotes();
  const duplicateNote= notes.find((note)=> note.title===title) ;
  debugger
  if(title && body && !duplicateNote)
  {notes.push({title,body});
  saveNotes(notes);
  console.log(chalk.inverse.green("New note added!"));}
  else console.log(chalk.red.inverse("Note title taken!"));
}

const removeNote=(title)=>
{
  const notes=loadNotes();
  if(title)
  {
    const duplicateNote= notes.find((note)=> note.title===title);
    if(!duplicateNote)
    console.log(chalk.red.inverse("Note not found!"));
    else
  { const duplicateNotes= notes.filter((note)=> note.title!==title);
    saveNotes(duplicateNotes);
    console.log(chalk.green.inverse(("Note removed!")));
  }
  }
  else
  console.log(chalk.red.inverse("Note not found!"));
  }

const readNote=(title)=>
{
  const notes=loadNotes();
  if(title)
    {
      const duplicateNote= notes.find((note)=> note.title===title);
      if(duplicateNote)
      console.log( chalk.yellow("Title: "+duplicateNote.title,"\nBody: ",duplicateNote.body));
      
      else
        console.log(chalk.inverse.red("No note with this title"));
    }
else
        console.log(chalk.inverse.red("No note with this title"));
}

const listNote=function()
{
  const notes=loadNotes();
  console.log(chalk.inverse("Your notes"));
  notes.forEach((note)=> console.log(chalk.yellow("Title:",note.title)));

}
module.exports={addNote,readNote,removeNote,listNote}