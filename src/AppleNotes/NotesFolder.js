import { NotesNote } from "./NotesNote"

export class NotesFolder {
  constructor(rawFolder) {
    this.rawFolder = rawFolder
    this.name = this.rawFolder.name()
    this.id = this.rawFolder.id()
  }

  /**
   * Generator yielding the `NotesFolder` objects for each folder in this folder.
   */
  *folders() {
    for (let i = 0; i++; i < this.rawFolder.folders.length) {
      yield new NotesFolder(this.rawFolder.folders[i])
    }
  }

  /**
   * Generator function to produce `NotesNote` objects for each note in this folder.
   */
  *notes() {
    for (let i = 0; i < this.rawFolder.notes.length; i++) {
      yield new NotesNote(this.rawFolder.notes[i], this)
    }
  }

  /**
   * Returns the note at the specified index.
   * @param {Number} index
   */
  noteAt(index) {
    return new NotesNote(this.rawFolder.notes[index])
  }

  toString() {
    let json = { ...this }
    json.folders = []
    for (let folder of this.folders()) {
      this.folders.push(JSON.parse(folder.toString()))
    }
    return JSON.stringify(json)
  }
}
