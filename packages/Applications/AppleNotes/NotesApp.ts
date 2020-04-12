import { NotesNote } from "./NotesNote"
import { NotesFolder } from "./NotesFolder"
import { NotesAccount } from "./NotesAccount"

export class NotesApp {
  private readonly rawApp: Application
  public constructor() {
    this.rawApp = Application("Notes")
  }

  /**
   * Generator yielding the `NotesFolder` objects for each folder in the app's root.
   */
  public *folders(): IterableIterator<NotesFolder> {
    for (let i = 0; i < this.rawApp.folders.length; i++) {
      yield new NotesFolder(this.rawApp.folders[i])
    }
  }

  public *accounts(): IterableIterator<NotesAccount> {
    for (let i = 0; i < this.rawApp.accounts.length; i++) {
      yield new NotesAccount(this.rawApp.accounts[i])
    }
  }

  /**
   * Generator function to produce `NotesNote` objects for each note in the app's root.
   */
  public *notes(): IterableIterator<NotesNote> {
    for (let i = 0; i < this.rawApp.notes.length; i++) {
      yield new NotesNote(this.rawApp.notes[i], null)
    }
  }
}
