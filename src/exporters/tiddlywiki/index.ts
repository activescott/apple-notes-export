import { AgentMarkdown } from "agentmarkdown"
import { writeTextToFile, createDir } from "../../../packages/jsx/abstractions/fs"
import { logger } from "../../lib/logutil"

export async function exportNote(note, outputDir) {
  const log = logger("tiddlywiki exportNote")

  outputDir = outputDir + "/tiddlers"
  createDir(outputDir)

  if (!note) throw new Error("note must be provided.")
  if (!outputDir) throw new Error("outputDir must be provided.")

  const resolveFilePath = fileName => `${outputDir}/${fileName}`

  // long titles end in a funky elipses character
  const title = note.name.endsWith("…") ? note.name.slice(0, note.name.length - 1): note.name
  log(title)

  // NOTE: AgentMarkdown doesn't run within the OSA host even with babel & webpack. So we're writing these files out as html here. Go back and create a new markdown process to convert separately
  const html = note.body
  let markdown = ""
  let noteFilePath = resolveFilePath(safeFileName(title))
  log("noteFilePath:", noteFilePath)
  let contentType = ""
  const CONVERT_TO_MARKDOWN = true
  if (CONVERT_TO_MARKDOWN) {
    contentType = "text/x-markdown"
    noteFilePath = noteFilePath + ".md"
    console["assert"] = () => null
    markdown = await AgentMarkdown.produce(html)
    writeTextToFile(markdown, noteFilePath)
  } else {
    // html
    contentType = "text/html"
    markdown = html
    noteFilePath = noteFilePath + ".html"
    // write the note
    writeTextToFile(markdown, noteFilePath)
  }

  // write the meta
  const tags = ["Apple Notes Imported"]
  if (note.folder && note.folder.name) tags.push(note.folder.name)

  const meta = createMeta(
    note.creationDate,
    note.modificationDate,
    tags,
    title,
    contentType
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
