import { NotesAttachment } from "./NotesAttachment"
//import { NotesFolder } from "./NotesFolder"

export class NotesNote {
  constructor(rawNote, folder) {
    // note it is fine for folder to be null. if you get the note from NotesApp.notes it seems to be in a wicked invalid state.
    this.folder = folder
    this.rawAttachments = rawNote.attachments
    this.name = rawNote.name()
    this.id = rawNote.id()
    this.creationDate = new Date(rawNote.creationDate())
    this.modificationDate = new Date(rawNote.modificationDate())
    this.body = rawNote.body()
  }

  *attachments() {
    for (let i = 0; i < this.rawAttachments.length; i++) {
      yield new NotesAttachment(this.rawAttachments[i])
    }
  }

  hasAttachments() {
    return this.rawAttachments.length > 0
  }

  save(path) {
    const pathObj = Path(path)
    note.save({
      in: pathObj,
      as: "native format"
    })
  }

  toString() {
    let json = { ...this }
    json.attachments = []
    for (let attachment of this.attachments()) {
      json.attachments.push(attachment.toJson())
    }
    return JSON.stringify(json)
  }
}
