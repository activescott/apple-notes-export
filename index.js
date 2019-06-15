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

  static first(iterable) {
    for (let v of iterable) {
      return v
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

  /**
   * Returns the note at the specified index.
   * @param {Number} index
   */
  noteAt(index) {
    return new NotesNote(this.rawFolder.notes[index])
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

class NotesAttachment {
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

  static toBoostnoteFile() {
    // TODO: create a folder and get the folder ID:
    const folderID = "6b0ce9f1d90d1302ed9a" //createFolder()
    /* BELOW causes error `TypeError: Attempted to assign to readonly property. (-2700)`
     
    let iterable = Tests.getAttachmentsTestFolder().notes()
    const nextObj = iterable.next()

    console.log("value:", nextObj.value)
    console.log("typeof", typeof nextObj.value)
    console.log("constructor", nextObj.value.constructor)
    console.log("constructor.name", nextObj.value.constructor.name)
    console.log("keys:", Object.keys(nextObj))
    debugger
    const noteObj = Object.assign({}, nextObj.value)
    //const valueProp = Object.getOwnPropertyDescriptor(nextObj, "value")
    //const noteObj = valueProp.value
    // Also fails:
    //const noteObj = Tools.first(Tests.getAttachmentsTestFolder().notes())
    */

    // Also fails:
    //const noteObj = Tests.getAttachmentsTestFolder().noteAt(0)
    const noteObj = Tests.getFirstFolder().noteAt(0)
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
}

Tests.listFolders()
//Tests.listNotes()
//Tests.listNotesWithAttachments()
//Tests.toBoostnoteFile()
//console.log(Tools.uuidv4())
