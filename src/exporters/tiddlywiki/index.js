//import { AgentMarkdown } from "agentmarkdown"
import { writeTextToFile } from "../../fs"

export async function exportNote(note, outputDir) {
  if (!note) throw new Error("note must be provided.")
  if (!outputDir) throw new Error("outputDir must be provided.")

  const resolveFilePath = fileName => `${outputDir}/${fileName}`

  const title = note.name
  // NOTE: AgentMarkdown doesn't run within the OSA host even with babel & webpack. So we're writing these files out as html here. Go back and create a new markdown process to convert separately
  const html = note.body
  const markdown = html
  //const markdown = await AgentMarkdown.produce(html)

  const noteFilePath = resolveFilePath(safeFileName(title)) + ".html"

  // write the note
  writeTextToFile(markdown, noteFilePath)

  // write the meta
  const tags = ["Apple Notes Imported"]
  if (note.folder && note.folder.name) tags.push(note.folder.name)

  const meta = createMeta(
    note.creationDate,
    note.modificationDate,
    tags,
    title,
    "text/html"
  )
  writeTextToFile(meta, noteFilePath + ".meta")

  //TODO: write attachments
}

const safeFileName = fileName => {
  // although this isn't perfect, it seemed like a safe set: https://www.ibm.com/support/knowledgecenter/SSLTBW_2.1.0/com.ibm.zos.v2r1.bpxa400/bpxug469.htm
  const matchForbiddenChars = /[^A-Za-z0-9\._-]/gi
  return fileName.replace(matchForbiddenChars, "_")
}

const createMeta = (
  created,
  modified,
  tags,
  title,
  type
) => `created: ${dateStr(created)}
creator: https://github.com/activescott/apple-notes-export
modified: ${dateStr(modified)}
tags: ${tagsStr(tags)}
title: ${title}
type: ${type}
`

const tagsStr = tagsArray =>
  tagsArray.map(tag => (tag.includes(" ") ? `[[${tag}]]` : tag)).join(" ")

/** Returns date like YYYYMMDDHHMMSSmmm */
const dateStr = date =>
  date.getUTCFullYear() +
  date
    .getUTCMonth()
    .toString()
    .padStart(2, "0") +
  date
    .getUTCDate()
    .toString()
    .padStart(2, "0") +
  date
    .getUTCHours()
    .toString()
    .padStart(2, "0") +
  date
    .getUTCMinutes()
    .toString()
    .padStart(2, "0") +
  date
    .getUTCSeconds()
    .toString()
    .padStart(2, "0") +
  date
    .getUTCMilliseconds()
    .toString()
    .padStart(3, "0")
