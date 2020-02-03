import { NotesFolder } from "./NotesFolder"

export class NotesAccount {
  public readonly name: string
  public readonly id: string

  constructor(private readonly rawAccount) {
    this.rawAccount = rawAccount
    this.name = this.rawAccount.name()
    this.id = this.rawAccount.id()
  }

  /**
   * Generator yielding the `NotesFolder` objects for each folder in this folder.
   */
  *folders(): IterableIterator<NotesFolder> {
    const folders = this.rawAccount.folders
    for (let i = 0; i++; i < folders.length) {
      yield new NotesFolder(folders[i])
    }
  }
}
