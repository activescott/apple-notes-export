export class NotesAttachment {
  public readonly id: string
  public readonly name: string
  public readonly contentIdentifier: string

  constructor(private readonly rawAttachment: any) {
    this.id = rawAttachment.id()
    this.name = rawAttachment.name()
    this.contentIdentifier = rawAttachment.contentIdentifier()
    this.rawAttachment = rawAttachment
  }

  save(path: string): void {
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
