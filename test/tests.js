import { writeTextToFile } from "../src/CoreFoundation/fs"

/**
 * Testing stuff
 */
export class Tests {
  static listFolders() {
    const app = new NotesApp()
    for (let f of app.folders()) {
      console.log(f)
    }
  }

  static listNotes() {
    const app = new NotesApp()
    for (let note of app.notes()) {
      console.log("note:", note)
    }
  }

  static getAttachmentsTestFolder() {
    const app = new NotesApp()
    for (let f of app.folders()) {
      if (f.name === "AttachmentTest") return f
    }
  }

  static getFirstFolder() {
    const app = new NotesApp()
    for (let f of app.folders()) {
      return f
    }
  }

  static listNotesWithAttachments() {
    const folder = Tests.getAttachmentsTestFolder()

    for (let note of folder.notes()) {
      console.log(".")
      if (note.hasAttachments()) {
        console.log(note)
        for (let attachment of note.attachments()) {
          console.log(attachment)
        }
      }
    }
  }

  /**
   * Returns an id for the note unique within the apple notes app/repository such as `p3283`
   */
  static getNoteIdentifier(noteObj) {
    // IDs look like: x-coredata://3EDE2B27-6ABC-463C-926C-A48B1CBD78F6/ICNote/p3283
    // The guid is apparently for the whole notebook or user or something.
    const noteID = noteObj && noteObj.id ? noteObj.id : ""
    const matchID = /[^\/]+$/
    const result = noteID.match(matchID)
    if (!result) {
      throw new Error(`Unexpected note ID: ${noteID}`)
    }
    return result[0]
  }

  static listNoteIdentifiers() {
    const app = new NotesApp()
    for (let note of app.notes()) {
      console.log(Tests.getNoteIdentifier(note))
    }
  }

  static toHtmlFile(noteObj) {
    writeTextToFile(
      noteObj.body,
      `/Users/scott/Downloads/noteHtmlFiles/${Tests.getNoteIdentifier(
        noteObj
      )}.html`
    )
  }

  static allNotesToHtml() {
    const app = new NotesApp()
    for (let note of app.notes()) {
      Tests.toHtmlFile(note)
    }
  }

  /**
   * I write a lot of notes in plain text or markdown in Apple Notes.
   * Since Apple Notes Automation API only returns them as HTML, this routine attempts to "guess" if they should be saved as plain text/markdown.
   */
  static isPlainTextEligible(html) {
    const elementNames = Tools.getHtmlElementNames(html)
    const plainTextTags = [
      "div",
      "br",
      "b",
      "ul",
      "ol",
      "li",
      "i",
      "u",
      "span",
      "font",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6"
    ]
    const isEligible = elementNames.every(el => plainTextTags.includes(el))
    if (!isEligible) {
      console.log(
        "*".repeat(60) + "\nineligible tags for plain text:",
        elementNames.filter(el => !plainTextTags.includes(el))
      )
    }
    return isEligible
  }

  /**
   * lists notes that are not eligible for plain text
   */
  static listNonPlainTextNotes() {
    const app = new NotesApp()
    for (let note of app.notes()) {
      let body = note.body
      body = Tools.fixEmailAddressElements(body)
      if (!Tests.isPlainTextEligible(body)) {
        console.log("note not eligible for plain text:", note.name)
        console.log("   Body:", note.body)
        console.log()
      }
    }
  }

  static testfixEmailAddressElements() {
    const tests = [
      "<div>Allys Threader <athreader@reference.com></div>",
      "<div>kaycee.moyle@vistaprint.com <kaycee.moyle@vistaprint.com></div>",
      "<div><b>tbirchenhead6@freewebs.com <tbirchenhead6@freewebs.com></b><br></div>",
      "<div>Allys Threader <athreader@cafex.com></div>\n<div>kaycee.moyle@vistaprint.com <kaycee.moyle@vistaprint.com></div>"
    ]
    for (let t of tests) {
      console.log(Tools.fixEmailAddressElements(t))
    }
  }
}

//Tests.listFolders()
//Tests.listNotes()
//Tests.listNotesWithAttachments()
//Tests.toBoostnoteFile(Tests.getFirstFolder().noteAt(0))
//Tests.allNotesToBostnote()

//Tests.testfixEmailAddressElements() // yea!
//console.log(Tools.uuidv4())
// Tests.listNonPlainTextNotes()
//Tests.listNoteIdentifiers()

//Tests.allNotesToHtml()
