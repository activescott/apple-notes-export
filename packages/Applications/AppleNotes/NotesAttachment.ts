export class NotesAttachment {
  public readonly id: string
  public readonly name: string
  public readonly contentIdentifier: string

  public constructor(private readonly rawAttachment: NotesRawAttachment) {
    this.id = rawAttachment.id()
    this.name = rawAttachment.name()
    this.contentIdentifier = rawAttachment.contentIdentifier()
    this.rawAttachment = rawAttachment
  }

  public save(path: string): void {
    const pathObj = Path(path)
    this.rawAttachment.save({
      in: pathObj,
      as: "native format"
    })
  }

  public toJson(): {
    id: string
    name: string
    contentIdentifier: string
  } {
    return { ...this }
  }

  public toString(): string {
    return JSON.stringify(this.toJson())
  }
}

export interface NotesRawAttachment {
  save(arg0: { in: Path; as: string })
  contentIdentifier(): string
  name(): string
  id(): string
}
