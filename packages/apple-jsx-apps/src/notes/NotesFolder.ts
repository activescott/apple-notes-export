import { NotesNote, NotesRawNote } from "./NotesNote"

export class NotesFolder {
  public readonly name: string
  public readonly id: string

  public constructor(private readonly rawFolder: NotesRawFolder) {
    this.rawFolder = rawFolder
    this.name = this.rawFolder.name()
    this.id = this.rawFolder.id()
  }

  /**
   * Generator yielding the `NotesFolder` objects for each folder in this folder.
   */
  public *folders(): IterableIterator<NotesFolder> {
    for (let i = 0; i++; i < this.rawFolder.folders.length) {
      yield new NotesFolder(this.rawFolder.folders[i])
    }
  }

  /**
   * Generator function to produce `NotesNote` objects for each note in this folder.
   */
  public *notes(): IterableIterator<NotesNote> {
    for (let i = 0; i < this.rawFolder.notes.length; i++) {
      yield new NotesNote(this.rawFolder.notes[i], this)
    }
  }

  /**
   * Returns the note at the specified index.
   * @param {Number} index
   */
  public noteAt(index: number): NotesNote {
    return new NotesNote(this.rawFolder.notes[index], this)
  }

  public toString(): string {
    const json = {
      name: this.name,
      id: this.id,
      folders: Array.from(this.folders()).map((f) => JSON.parse(f.toString())),
    }
    return JSON.stringify(json)
  }
}

export interface NotesRawFolder {
  notes: NotesRawNote[]
  folders: NotesRawFolder[]
  id(): string
  name(): string
}
