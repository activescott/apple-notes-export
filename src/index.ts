import { exportNote as exportBoostnote } from "./exporters/boostnote"
import { exportNote as exportTiddly } from "./exporters/tiddlywiki"
import { NotesApp } from "./AppleNotes"
import { DispatchSemaphore } from "../packages/jsx/abstractions/DispatchSemaphore"
import { args } from "../packages/jsx/abstractions/process"
import { resolveRelativePath, fileExistsAtPath, createDir } from "../packages/jsx/abstractions/fs"
import { logger } from "./lib/logutil"

// maps exporter name to exportNote function:
const exporterNameMap = {
  boostnote: exportBoostnote,
  tiddlywiki: exportTiddly
}

// read args, expect the name of an exporter in exporters/<name> to be provided.
function parseArgs() {
  // console.log("arguments:", args())
  // with no arguments looks like this: ["/usr/bin/osascript","-l","JavaScript","dist/bundle.js"]
  const a = args()
  const ARG_START_INDEX = 4
  if (ARG_START_INDEX >= a.length) {
    throw new Error(
      `The first argument must be one of the following values: ${Object.keys(
        exporterNameMap
      ).join(", ")}`
    )
  }
  const exporterName = a[ARG_START_INDEX]
  if (!Object.keys(exporterNameMap).includes(exporterName)) {
    throw new Error(
      `'${exporterName}' is not a known exporter. You must supply one of the following values: ${Object.keys(
        exporterNameMap
      ).join(", ")}`
    )
  }
  return exporterName
}

function getOutputDir(exporterName) {
  const outputDirOrig = resolveRelativePath(`data/${exporterName}`)
  let outputDir = outputDirOrig
  let i = 0
  while (fileExistsAtPath(outputDir)) {
    console.log("file exists:", outputDir)
    i++
    outputDir = outputDirOrig + i.toString()
  }
  return outputDir
}

async function doExport(exporterName, outputDir) {
  const log = logger("doExport")
  log("Creating dir", outputDir, "...")
  createDir(outputDir)
  log("Creating dir", outputDir, "complete.")
  const exportNoteFunc = exporterNameMap[exporterName]
  const app = new NotesApp()
  for (let folder of app.folders()) {
    log("folder:", folder.name)
    for (let note of folder.notes()) {
      await exportNoteFunc(note, outputDir)
    }
  }
}

async function main() {
  const exporterName = parseArgs()
  console.log("Using exporter", exporterName, "...")
  const outputDir = getOutputDir(exporterName)
  console.log("Using output directory", outputDir, "...")
  await doExport(exporterName, outputDir)
  console.log("Export complete.")
}

const result = main()

DispatchSemaphore.waitOnPromise(result)
