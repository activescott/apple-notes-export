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

class Tools {
  static uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  static writeTextToFile(text, file) {
    var app = Application.currentApplication()
    app.includeStandardAdditions = true
    let openedFile = null
    try {
      // Convert the file to a string
      var fileString = file.toString()
      // Open the file for writing
      openedFile = app.openForAccess(Path(fileString), {
        writePermission: true
      })
      // Clear the file if content should be overwritten
      //if (overwriteExistingContent) {
      if (true) {
        app.setEof(openedFile, { to: 0 })
      }
      // Write the new content to the file
      app.write(text, { to: openedFile, startingAt: app.getEof(openedFile) })
      console.log(`Write to file '${file}' complete.`)
      // Close the file
      app.closeAccess(openedFile)
      openedFile = null
    } catch (err) {
      console.log("Error writing file:", err)
    } finally {
      if (openedFile) {
        try {
          app.closeAccess(openedFile)
        } catch (error) {
          console.log(`Couldn't close file: ${error}`)
        }
      }
    }
  }
}

class NotesApp {
  constructor() {
    this.rawApp = Application("Notes")
  }

  /**
   * Generator yielding the `NotesFolder` objects for each folder in the app's root.
   */
  *folders() {
    for (let i = 0; i < this.rawApp.folders.length; i++) {
      yield new NotesFolder(this.rawApp.folders[i])
    }
  }

  /**
   * Generator function to produce `NotesNote` objects for each note in the app's root.
   */
  *notes() {
    for (let i = 0; i < this.rawApp.notes.length; i++) {
      yield new NotesNote(this.rawApp.notes[i])
    }
  }
}

class NotesFolder {
  constructor(rawFolder) {
    this.rawFolder = rawFolder
    this.name = this.rawFolder.name()
    this.id = this.rawFolder.id()
  }
  /**
   * Generator yielding the `NotesFolder` objects for each folder in this folder.
   */
  *folders() {
    for (let i = 0; i++; i < this.rawFolder.folders.length) {
      yield new NotesFolder(this.rawFolder.folders[i])
    }
  }

  /**
   * Generator function to produce `NotesNote` objects for each note in this folder.
   */
  *notes() {
    for (let i = 0; i < this.rawFolder.notes.length; i++) {
      yield new NotesNote(this.rawFolder.notes[i])
    }
  }

  toString() {
    let json = { ...this }
    json.folders = []
    for (let folder of this.folders()) {
      this.folders.push(JSON.parse(folder.toString()))
    }
    return JSON.stringify(json)
  }
}

class NotesNote {
  constructor(rawNote) {
    this.rawNote = rawNote
    this.name = rawNote.name()
    this.id = rawNote.id()
    this.creationDate = new Date(rawNote.creationDate())
    this.modificationDate = new Date(rawNote.modificationDate())
    this.body = rawNote.body()
  }

  *attachments() {
    for (let i = 0; i < this.rawNote.attachments.length; i++) {
      yield new NotesAttachment(this.rawNote.attachments[i])
    }
  }

  hasAttachments() {
    return this.rawNote.attachments.length > 0
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

class NotesAttachment {
  constructor(rawAttachment) {
    this.rawAttachment = rawAttachment
    this.id = this.rawAttachment.id()
    this.name = this.rawAttachment.name()
    this.contentIdentifier = this.rawAttachment.contentIdentifier()
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

// testing stuff:
function listFolders() {
  const app = new NotesApp()
  for (let f of app.folders()) {
    console.log(f)
  }
}

function listNotes() {
  const app = new NotesApp()
  for (let note of app.notes()) {
    console.log("note:", note)
  }
}

function listNotesWithAttachments() {
  const app = new NotesApp()
  let folder = null
  for (let f of app.folders()) {
    if (f.name === "AttachmentTest") folder = f
  }

  for (let note of folder.notes()) {
    console.log(".")
    if (note.hasAttachments()) {
      console.log(note)
      /* attachment data is already in note's toString
      for (let attachment of note.attachments()) {
        console.log(attachment)
      }
      */
    }
  }
}

function test() {
  //listFolders()
  //listNotes()
  listNotesWithAttachments()
  // console.log(Tools.uuidv4())
  // write a note to a file
  // const text = app.notes()[0].body()
  //Tools.writeTextToFile(text, "/Users/scott/Downloads/note-test.html")
}

test()
