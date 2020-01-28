import { NotesApp } from "../../AppleNotes"
import { Tools } from "../../Tools"
import { writeTextToFile } from "../../fs"

/**
 *
 * @param {NotesNote} noteObj A @see NotesNote object.
 */
export function exportNote(noteObj, outputDir) {
  if (!noteObj) throw new Error("noteObj must be provided.")
  if (!outputDir) throw new Error("outputDir must be provided.")
  // TODO: create a folder and get the folder ID:
  const folderID = "XXXXXXXXXXXX"
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
  writeTextToFile(content, `${outputDir}/${Tools.uuidv4()}.cson`)
}

// example:
function exportNotes() {
  const app = new NotesApp()
  for (let note of app.notes()) {
    exportNote(note)
  }
}
