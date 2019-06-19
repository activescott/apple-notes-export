/**
 * A script for programatically accessing your Apple Notes data.
 * NOTE: This is an AppleScript in JavaScript syntax (aka JavaScript for Automation). See https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW34#//apple_ref/doc/uid/TP40014508-CH109-SW51
 * You must use the osascript command-line tool to run it.
 *
 * MISC Syntax notes:
 * - To send the get event to the external entity and return its value, call the property as a function!
 * Debugging Notes:
 * - enter the command `debugger` into a script to stop it in safari's debugger.
 * - See https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-11.html#//apple_ref/doc/uid/TP40014508-CH110-SW3
 */
import { Tools } from "./Tools"
import { NotesApp } from "./AppleNotes"

/**
 * Testing stuff
 */
class Tests {
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

  static toBoostnoteFile(noteObj) {
    // TODO: create a folder and get the folder ID:
    const folderID = "6b0ce9f1d90d1302ed9a" //createFolder()
    let content = ""
    content += `createdAt: ${JSON.stringify(noteObj.creationDate)}\n`
    content += `updatedAt: ${JSON.stringify(noteObj.modificationDate)}\n`
    content += `type: "SNIPPET_NOTE"\n`
    content += `folder: "${folderID}"\n`
    content += `title: ${JSON.stringify(noteObj.name)}\n`
    content += `tags: []\n`
    content += `description: "Imported from Apple Notes note ID ${noteObj.id}"\n`
    content += `snippets: [\n`
    content += `  {\n`
    content += `      linesHighlighted: []\n`
    content += `      name: ${JSON.stringify(noteObj.name)}\n`
    content += `      mode: "HTML"\n`
    content += `      content: '''\n`
    content += `${JSON.stringify(noteObj.name)}\n`
    content += `${noteObj.body}`
    content += `      '''\n`
    content += `    }\n`
    content += `]\n`
    content += `isStarred: false\n`
    content += `isTrashed: false\n`
    Tools.writeTextToFile(
      content,
      `/Users/scott/Downloads/${Tools.uuidv4()}.cson`
    )
  }

  static allNotesToBostnote() {
    const app = new NotesApp()
    for (let note of app.notes()) {
      Tests.toBoostnoteFile(note)
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
      "<div>Wanda Taylor <wtaylor@cafex.com></div>",
      "<div>brent.booth@plansource.com <brent.booth@plansource.com></div>",
      "<div><b>samanthac@dropbox.com <samanthac@dropbox.com></b><br></div>",
      "<div>Wanda Taylor <wtaylor@cafex.com></div>\n<div>brent.booth@plansource.com <brent.booth@plansource.com></div>"
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
Tests.listNonPlainTextNotes()
//Tests.testfixEmailAddressElements() // yea!
//console.log(Tools.uuidv4())
