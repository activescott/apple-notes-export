import { NotesApp } from "../packages/Applications/AppleNotes"
import { writeTextToFile } from "../packages/jsx/abstractions/fs"
import { getHtmlElementNames, fixEmailAddressElements } from "./tools"
import { NotesFolder } from "../packages/Applications/AppleNotes/NotesFolder"
import { NotesNote } from "../packages/Applications/AppleNotes/NotesNote"

//TODO: clean it up with real tests

/* eslint-disable no-console */

export function listFolders(): void {
  const app = new NotesApp()
  for (const f of app.folders()) {
    console.log(f)
  }
}

export function listNotes(): void {
  const app = new NotesApp()
  for (const note of app.notes()) {
    console.log("note:", note)
  }
}

export function getAttachmentsTestFolder(): NotesFolder {
  const app = new NotesApp()
  for (const f of app.folders()) {
    if (f.name === "AttachmentTest") return f
  }
}

export function getFirstFolder(): NotesFolder {
  const app = new NotesApp()
  for (const f of app.folders()) {
    return f
  }
}

export function listNotesWithAttachments(): void {
  const folder = getAttachmentsTestFolder()

  for (const note of folder.notes()) {
    console.log(".")
    if (note.hasAttachments()) {
      console.log(note)
      for (const attachment of note.attachments()) {
        console.log(attachment)
      }
    }
  }
}

/**
 * Returns an id for the note unique within the apple notes app/repository such as `p3283`
 */
export function getNoteIdentifier(noteObj: NotesNote): string {
  // IDs look like: x-coredata://3EDE2B27-6ABC-463C-926C-A48B1CBD78F6/ICNote/p3283
  // The guid is apparently for the whole notebook or user or something.
  const noteID = noteObj && noteObj.id ? noteObj.id : ""
  const matchID = /[^/]+$/
  const result = noteID.match(matchID)
  if (!result) {
    throw new Error(`Unexpected note ID: ${noteID}`)
  }
  return result[0]
}

export function listNoteIdentifiers(): void {
  const app = new NotesApp()
  for (const note of app.notes()) {
    console.log(getNoteIdentifier(note))
  }
}

export function toHtmlFile(noteObj: NotesNote): void {
  writeTextToFile(
    noteObj.body,
    `/Users/scott/Downloads/noteHtmlFiles/${getNoteIdentifier(noteObj)}.html`
  )
}

export function allNotesToHtml(): void {
  const app = new NotesApp()
  for (const note of app.notes()) {
    toHtmlFile(note)
  }
}

/**
 * I write a lot of notes in plain text or markdown in Apple Notes.
 * Since Apple Notes Automation API only returns them as HTML, this routine attempts to "guess" if they should be saved as plain text/markdown.
 */
export function isPlainTextEligible(html): boolean {
  const elementNames = getHtmlElementNames(html)
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
    const LONG_LINE = 60
    console.log(
      "*".repeat(LONG_LINE) + "\nineligible tags for plain text:",
      elementNames.filter(el => !plainTextTags.includes(el))
    )
  }
  return isEligible
}

/**
 * lists notes that are not eligible for plain text
 */
export function listNonPlainTextNotes(): void {
  const app = new NotesApp()
  for (const note of app.notes()) {
    let body = note.body
    body = fixEmailAddressElements(body)
    if (!isPlainTextEligible(body)) {
      console.log("note not eligible for plain text:", note.name)
      console.log("   Body:", note.body)
      console.log()
    }
  }
}

export function testfixEmailAddressElements(): void {
  const tests = [
    "<div>Allys Threader <athreader@reference.com></div>",
    "<div>kaycee.moyle@vistaprint.com <kaycee.moyle@vistaprint.com></div>",
    "<div><b>tbirchenhead6@freewebs.com <tbirchenhead6@freewebs.com></b><br></div>",
    "<div>Allys Threader <athreader@cafex.com></div>\n<div>kaycee.moyle@vistaprint.com <kaycee.moyle@vistaprint.com></div>"
  ]
  for (const t of tests) {
    console.log(fixEmailAddressElements(t))
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
