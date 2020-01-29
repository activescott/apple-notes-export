export class NotesAccount {
  constructor(rawAccount) {
    this.rawAccount = rawAccount
    this.name = this.rawAccount.name()
    this.id = this.rawAccount.id()
  }

  /**
   * Generator yielding the `NotesFolder` objects for each folder in this folder.
   */
  *folders() {
    const folders = this.rawAccount.folders
    for (let i = 0; i++; i < folders.length) {
      yield new NotesFolder(folders[i])
    }
  }
}
