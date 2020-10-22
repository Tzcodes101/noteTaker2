const util = require("util");
const fs = require("fs");

const readFileAsyn = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class Store {
    constructor() {
        this.idDum = 0;
    }
    read() {
        return readFileAsyn("db/db.json", "utf8");

    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    } write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes() {
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
    addNotes(note) {
        const { title, text } = note;
        const newNote = { title, text, id: ++this.idDum }
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(filterNotes => this.write(filterNotes))
            .then(() => newNote)

    }
    removeNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== parseInt(id)))
            .then(filteredNotes => this.write(filteredNotes))
    }
}

module.exports = new Store();