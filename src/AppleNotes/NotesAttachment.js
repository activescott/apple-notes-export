export class NotesAttachment {
  constructor(rawAttachment) {
    this.id = rawAttachment.id()
    this.name = rawAttachment.name()
    this.contentIdentifier = rawAttachment.contentIdentifier()
    this.rawAttachment = rawAttachment
  }

  save(path) {
    const pathObj = Path(path)
    this.rawAttachment.save({
      in: pathObj,
      as: "native format"
    })
  }

  toJson() {
    return { ...this }
  }

  toString() {
    return JSON.stringify(this.toJson())
  }
}
