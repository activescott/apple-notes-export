import { NotesAttachment, NotesRawAttachment } from "./NotesAttachment"
import { NotesFolder } from "./NotesFolder"

export class NotesNote {
  public readonly folder: NotesFolder
  public readonly rawAttachments: NotesRawAttachment[]
  public readonly name: string
  public readonly id: string
  public readonly creationDate: Date
  public readonly modificationDate: Date
  public readonly body: string

  public constructor(
    private readonly rawNote: NotesRawNote,
    folder: NotesFolder
  ) {
    // note it is fine for folder to be null. if you get the note from NotesApp.notes it seems to be in a wicked invalid state.
    this.folder = folder
    this.rawAttachments = rawNote.attachments
    this.name = rawNote.name()
    this.id = rawNote.id()
    this.creationDate = new Date(rawNote.creationDate())
    this.modificationDate = new Date(rawNote.modificationDate())
    this.body = rawNote.body()
  }

  public *attachments(): IterableIterator<NotesAttachment> {
    for (let i = 0; i < this.rawAttachments.length; i++) {
      yield new NotesAttachment(this.rawAttachments[i])
    }
  }

  public hasAttachments(): boolean {
    return this.rawAttachments.length > 0
  }

  public save(path: string): void {
    const pathObj = Path(path)
    this.rawNote.save({
      in: pathObj,
      as: "native format"
    })
  }

  public toString(): string {
    const json = {
      ...this,
      attachments: Array.from(this.attachments()).map(a => a.toJson())
    }
    return JSON.stringify(json)
  }
}

export interface NotesRawNote {
  attachments: NotesRawAttachment[]
  save(arg0: { in: Path; as: string })
  body(): string
  modificationDate(): string | number | Date
  creationDate(): string | number | Date
  id(): string
  name(): string
}
