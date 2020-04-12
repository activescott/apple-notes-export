import { exportNote as exportBoostnote } from "./exporters/boostnote"
import { exportNote as exportTiddly } from "./exporters/tiddlywiki"
import { NotesApp } from "../packages/Applications/AppleNotes"
import { DispatchSemaphore } from "../packages/jsx/abstractions/DispatchSemaphore"
import { args } from "../packages/jsx/abstractions/process"
import {
  resolveRelativePath,
  fileExistsAtPath,
  createDir
} from "../packages/jsx/abstractions/fs"
import { logger } from "./lib/logger"
import * as minimist from "minimist"

/* eslint-disable no-console */

type Exporter = "tiddlywiki" | "boostnote"
// maps exporter name to exportNote function:
const exporterNameMap = {
  boostnote: exportBoostnote,
  tiddlywiki: exportTiddly
}

function showHelp(): void {
  console.log(`
Usage: apple-notes-export <command> [options]

Commands:
  apple-notes-export tiddlywiki  Exports the notes to tiddlywiki format
  apple-notes-export boostnote   Exports the notes to boostnote format

Options:
  -f, --filter  Specifies a regex to filter note names by
  -h, --help    Show this help message

`)
}

/**
 * read args, expect the name of an exporter in exporters/<name> to be provided.
 */
function parseArgs(): {
  exporterName: string
  filter: string
} {
  const APP_ARGS_START = 4
  const argv = minimist(args().slice(APP_ARGS_START), {
    alias: {
      help: "h",
      filter: "f"
    }
  })

  if (argv.h) showHelp()

  if (argv._.length != 1) {
    showHelp()
    throw new Error(
      `The first argument must be one of the following values: ${Object.keys(
        exporterNameMap
      ).join(", ")}`
    )
  }

  const exporterName = argv._[0]
  if (!Object.keys(exporterNameMap).includes(exporterName)) {
    showHelp()
    throw new Error(
      `'${exporterName}' is not a known exporter. You must supply one of the following values: ${Object.keys(
        exporterNameMap
      ).join(", ")}`
    )
  }

  return {
    exporterName,
    filter: argv.filter ?? ""
  }
}

function getOutputDir(exporterName: Exporter): string {
  const outputDirOrig = resolveRelativePath(
    `~/Downloads/apple-notes-export/${exporterName}`
  )
  let outputDir = outputDirOrig
  let i = 0
  while (fileExistsAtPath(outputDir)) {
    console.log("file exists:", outputDir)
    i++
    outputDir = outputDirOrig + i.toString()
  }
  return outputDir
}

async function doExport(
  exporterName: Exporter,
  outputDir: string,
  filter: string
): Promise<void> {
  const log = logger("doExport")
  log("Creating dir", outputDir, "...")
  createDir(outputDir)
  log("Creating dir", outputDir, "complete.")
  const exportNoteFunc = exporterNameMap[exporterName]
  const app = new NotesApp()
  const filterExp = filter ? new RegExp(filter, "i") : null
  if (filter) log(`Applying note filter: ${filter}`)
  for (const folder of app.folders()) {
    log("opening folder:", folder.name)
    for (const note of folder.notes()) {
      if (!filterExp || filterExp.test(note.name)) {
        await exportNoteFunc(note, outputDir)
      }
    }
  }
}

async function main(): Promise<void> {
  const args = parseArgs()
  console.log(`Using exporter ${args.exporterName} ...`)
  const outputDir = getOutputDir(args.exporterName as Exporter)
  console.log(`Using output directory ${outputDir} ...`)
  await doExport(args.exporterName as Exporter, outputDir, args.filter)
  console.log(`Export completed successfully. Saved to ${outputDir}`)
}

const result = main()

DispatchSemaphore.waitOnPromise(result)
