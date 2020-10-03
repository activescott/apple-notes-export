import { arrayFromIterable } from "../lib/collections"
import { NotesFolder, NotesRawFolder } from "./NotesFolder"
import { NotesNote, NotesRawNote } from "./NotesNote"

export class NotesAccount {
  public readonly name: string
  public readonly id: string

  public constructor(private readonly rawAccount: RawAccount) {
    this.rawAccount = rawAccount
    this.name = this.rawAccount.name()
    this.id = this.rawAccount.id()
  }

  public upgraded(): boolean {
    return this.rawAccount.upgraded()
  }

  /**
   * Generator yielding the `NotesFolder` objects for each folder in this folder.
   */
  public *folders(): IterableIterator<NotesFolder> {
    for (let i = 0; i++; i < this.rawAccount.folders.length) {
      yield new NotesFolder(this.rawAccount.folders[i])
    }
  }

  /**
   * Generator function to produce `NotesNote` objects for each note in this folder.
   */
  public *notes(): IterableIterator<NotesNote> {
    for (let i = 0; i < this.rawAccount.notes.length; i++) {
      yield new NotesNote(this.rawAccount.notes[i], null)
    }
  }

  public toString(): string {
    const json = {
      name: this.name,
      id: this.id,
      upgraded: this.upgraded(),
      folderCount: this.rawAccount.folders.length,
      folders: arrayFromIterable(this.folders()).map((f) =>
        JSON.parse(f.toString())
      ),
    }
    return JSON.stringify(json)
  }
}

interface RawAccount {
  folders(): NotesRawFolder[]
  notes(): NotesRawNote[]
  // the default folder for creating notes
  defaultFolder(): NotesRawFolder
  // the name of the account
  name(): string
  // Is the account upgraded?
  upgraded(): boolean
  // the unique identifier of the account
  id(): string
}
