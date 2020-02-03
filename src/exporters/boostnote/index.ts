import { writeTextToFile } from "../../../packages/jsx/abstractions/fs"
import { NotesNote } from "../../../packages/Applications/AppleNotes/NotesNote"
import { uuidv4 } from "../../../test/tools"

/**
 *
 * @param {NotesNote} noteObj A @see NotesNote object.
 */
export async function exportNote(
  noteObj: NotesNote,
  outputDir: string
): Promise<void> {
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
  writeTextToFile(content, `${outputDir}/${uuidv4()}.cson`)
}
