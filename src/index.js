import { fileExists, resolveRelativePath, createDir } from "./fs"
import { args } from "./process"
import { exportNote as exportBoostnote } from "./exporters/boostnote"
import { exportNote as exportTiddly } from "./exporters/tiddlywiki"
import { NotesApp } from "./AppleNotes"

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
  const outputDir = resolveRelativePath(`data/${exporterName}`)
  if (fileExists(outputDir)) {
    throw new Error(
      `Output directory '${outputDir} already exists. Please remove this directory before running this exporter.`
    )
  }
  return outputDir
}

function doExport(exporterName, outputDir) {
  createDir(outputDir)

  const exportNoteFunc = exporterNameMap[exporterName]
  const app = new NotesApp()
  for (let note of app.notes()) {
    exportNoteFunc(note, outputDir)
  }
}

function main() {
  const exporterName = parseArgs()
  console.log("Using exporter", exporterName, "...")
  const outputDir = getOutputDir(exporterName)
  console.log("Using output directory", outputDir, "...")
  doExport(exporterName, outputDir)
  console.log("Export complete.")
}

main()
