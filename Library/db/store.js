//dependenciesconst util = require("util");
const fs = require("fs");

//read and write file Async/promisify
const readFileAsyn = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


//create class store
class Store {
    constructor() {
        this.idNum = 0;
    }

    //read notes
    read() {
        return readFileAsyn("db/db.json", "utf8");
    }
    //write notes
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }

    //getNotes
        //join note to array if needed
        //catch error
        //display notesarray
        getNotes() {
            console.log("get notes")
            return this.read().then(notes => {
                console.log(notes)
                let notesArray;
                try {
                    notesArray = [].concat(JSON.parse(notes));
                }
                catch (err) {
                    notesArray = [];
                }
                return notesArray;
            })
    
        }

    //addnotes
        //note constructor(title, text)
        //new note constructor (title, text, id)
        //use getNotes and add newNote to notes
        //write notes as a new note
        addNotes(note) {
            console.log("add notes");
            const { title, text } = note;
            const newNote = { title, text, id: ++this.idDum }
            return this.getNotes()
                .then(notes => [...notes, newNote])
                .then(filterNotes => this.write(filterNotes))
                .then(() => newNote)
    
        }
    //removenote using id
        //usegetNotes
        //filter notes by id, turn id into integer
        //write filterednotes
        removeNote(id) {
            console.log("remove notes");
            return this.getNotes()
                .then(notes => notes.filter(note => note.id !== parseInt(id)))
                .then(filteredNotes => this.write(filteredNotes))
        }
}
    //export store as new Store module
    module.exports = new Store();