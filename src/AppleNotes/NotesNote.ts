import { NotesAttachment } from "./NotesAttachment"
import { NotesFolder } from "./NotesFolder"
//import { NotesFolder } from "./NotesFolder"

export class NotesNote {
  public readonly folder: NotesFolder
  public readonly rawAttachments: any
  public readonly name: string
  public readonly id: string
  public readonly creationDate: Date
  public readonly modificationDate: Date
  public readonly body: any
  
  constructor(private readonly rawNote: any, folder: NotesFolder) {
    // note it is fine for folder to be null. if you get the note from NotesApp.notes it seems to be in a wicked invalid state.
    this.folder = folder
    this.rawAttachments = rawNote.attachments
    this.name = rawNote.name()
    this.id = rawNote.id()
    this.creationDate = new Date(rawNote.creationDate())
    this.modificationDate = new Date(rawNote.modificationDate())
    this.body = rawNote.body()
  }

  *attachments(): IterableIterator<NotesAttachment> {
    for (let i = 0; i < this.rawAttachments.length; i++) {
      yield new NotesAttachment(this.rawAttachments[i])
    }
  }

  hasAttachments(): boolean {
    return this.rawAttachments.length > 0
  }

  save(path: string): void {
    const pathObj = Path(path)
    this.rawNote.save({
      in: pathObj,
      as: "native format"
    })
  }

  toString(): string {
    let json = {
      ...this,
      attachments: Array.from(this.attachments()).map(a => a.toJson())
    }    
    return JSON.stringify(json)
  }
}
