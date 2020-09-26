import { AgentMarkdown } from "agentmarkdown"
import {
  writeTextToFile,
  createDir,
  fileExistsAtPath
} from "../../../packages/jsx/abstractions/fs"
import { logger } from "../../lib/logger"
import { NotesNote } from "../../../packages/Applications/AppleNotes/NotesNote"
import { NotesAttachment } from "../../../packages/Applications/AppleNotes/NotesAttachment"
import * as mimeTypes from "mime-types"
import { parse } from "../../../packages/jsx/abstractions/path"

export async function exportNote(
  note: NotesNote,
  outputDir: string
): Promise<void> {
  const log = logger("tiddlywiki exportNote")

  outputDir = outputDir + "/tiddlers"
  createDir(outputDir)

  if (!note) throw new Error("note must be provided.")
  if (!outputDir) throw new Error("outputDir must be provided.")

  log(`exporting note '${noteTitle(note)}'`)

  const html = note.body
  let markdown = ""
  let noteFilePath = resolveFilePathUnique(
    outputDir,
    safeFileName(noteTitle(note))
  )
  let contentType = ""
  const CONVERT_TO_MARKDOWN = true
  if (CONVERT_TO_MARKDOWN) {
    contentType = "text/x-markdown"
    noteFilePath = noteFilePath + ".md"
    // add a fake console assert because AgentMarkdown uses it
    // TODO: FIX AgentMarkdown!
    // eslint-disable-next-line no-console
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
  if (note.folder && note.folder.name) {
    tags.push(note.folder.name)
    tags.push("Apple Notes Folder " + note.folder.name)
  }
  if (hasAttachments(note)) {
    tags.push(attachmentTagName(noteTitle(note)))
  }
  const meta = createMeta(
    note.creationDate,
    note.modificationDate,
    tags,
    noteTitle(note),
    contentType
  )
  writeTextToFile(meta, noteFilePath + ".meta")

  // write attachments
  for (const attachment of note.attachments()) {
    log(`exporting attachment: ${attachment.name}`)
    exportAttachment(attachment, outputDir, noteTitle(note), tags)
  }
}

/**
 * Returns a path resolved for the given file; also ensures it is unique by adding a postfix as needed
 * @param outputDir output dir for the file
 * @param fileName the file name
 */
const resolveFilePathUnique = (outputDir: string, fileName: string): string => {
  let counter = -1
  let path = null
  do {
    if (++counter > 0) {
      const parts = parse(fileName)
      path = `${outputDir}/${parts.name} (${counter})${parts.ext}`
    } else {
      path = `${outputDir}/${fileName}`
    }
  } while (fileExistsAtPath(path))
  return path
}

const hasAttachments = (note: NotesNote): boolean => {
  // eslint-disable-next-line no-empty-pattern
  for (const {} of note.attachments()) {
    return true
  }
  return false
}

// NOTE: long titles end in a funky ellipses character
const noteTitle = (note: NotesNote): string =>
  note.name.endsWith("…") ? note.name.slice(0, note.name.length - 1) : note.name

const attachmentTagName = (noteTitle: string): string =>
  `Attachments for ${noteTitle}`

function exportAttachment(
  attachment: NotesAttachment,
  outputDir: string,
  noteTitle: string,
  notesTags: string[]
): void {
  let hasSaveError = false
  const attachmentFilePath = resolveFilePathUnique(
    outputDir,
    safeFileName(attachment.name)
  )
  try {
    attachment.save(attachmentFilePath)
  } catch (err) {
    hasSaveError = true

    console.log("\n" + "*".repeat(50))
    console.log(
      `Error saving attachment ${attachment.name} of note ${noteTitle}!`
    )
    console.log("*".repeat(50) + "\n")

    // TODO: Pass in a command line argument that allows continuing on failures; by default fail and stop

    return
  }

  // save the meta
  // NOTE: the note includes a special tag to link the attachments & parent note
  const meta = createMeta(
    attachment.creationDate,
    attachment.modificationDate,
    notesTags,
    attachment.name,
    contentTypeForAttachment(attachment)
  )
  writeTextToFile(meta, attachmentFilePath + ".meta")
}

const contentTypeForAttachment = (attachment: NotesAttachment): string => {
  const fallback = "application/octet-stream"
  // first look for a file extension:
  const parts = attachment.name.split(".")
  if (parts.length > 1) {
    const t = mimeTypes.lookup(parts[parts.length - 1])
    return t ? t : fallback
  } else {
    return fallback
  }
}

const safeFileName = (fileName: string): string => {
  // although this isn't perfect, it seemed like a safe set: https://www.ibm.com/support/knowledgecenter/SSLTBW_2.1.0/com.ibm.zos.v2r1.bpxa400/bpxug469.htm
  if (!fileName) fileName = "null"
  const matchForbiddenChars = /[^A-Za-z0-9._-]/gi
  return fileName.replace(matchForbiddenChars, "_")
}

function createMeta(
  created: Date,
  modified: Date,
  tags: string[],
  title: string,
  contentType: string = ""
): string {
  let str = `created: ${dateStr(created)}
creator: https://github.com/activescott/apple-notes-export
modified: ${dateStr(modified)}
tags: ${tagsStr(tags)}
title: ${title}
`
  if (contentType) {
    str += `type: ${contentType}\n`
  }
  return str
}

const tagsStr = (tagsArray: string[]): string =>
  tagsArray.map(tag => (tag.includes(" ") ? `[[${tag}]]` : tag)).join(" ")

/** Returns date like YYYYMMDDHHMMSSmmm */
const dateStr = (date: Date): string =>
  /* eslint-disable no-magic-numbers */
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
/* eslint-enable no-magic-numbers */
