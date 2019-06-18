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
}

//Tests.listFolders()
//Tests.listNotes()
//Tests.listNotesWithAttachments()
//Tests.toBoostnoteFile(Tests.getFirstFolder().noteAt(0))
Tests.allNotesToBostnote()
//console.log(Tools.uuidv4())
