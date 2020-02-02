import { NotesNote } from "./NotesNote"

export class NotesFolder {
  private readonly rawFolder: any
  public readonly name: string
  public readonly id: string

  constructor(rawFolder: any) {
    this.rawFolder = rawFolder
    this.name = this.rawFolder.name()
    this.id = this.rawFolder.id()
  }

  /**
   * Generator yielding the `NotesFolder` objects for each folder in this folder.
   */
  *folders(): IterableIterator<NotesFolder> {
    for (let i = 0; i++; i < this.rawFolder.folders.length) {
      yield new NotesFolder(this.rawFolder.folders[i])
    }
  }

  /**
   * Generator function to produce `NotesNote` objects for each note in this folder.
   */
  *notes(): IterableIterator<NotesNote> {
    for (let i = 0; i < this.rawFolder.notes.length; i++) {
      yield new NotesNote(this.rawFolder.notes[i], this)
    }
  }

  /**
   * Returns the note at the specified index.
   * @param {Number} index
   */
  noteAt(index): NotesNote {
    return new NotesNote(this.rawFolder.notes[index], this)
  }

  toString(): string {
    const json = {
      name: this.name,
      id: this.id,
      folders: Array.from(this.folders()).map(f => JSON.parse(f.toString()))
    }
    json.folders = []
    return JSON.stringify(json)
  }
}
