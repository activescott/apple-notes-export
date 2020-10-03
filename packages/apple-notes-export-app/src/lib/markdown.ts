import {
  writeTextToFile,
  resolveRelativePath,
  createFileAtPath,
  fileHandleForWritingAtPath
} from "@activescott/apple-jsx/fs"
import { launchTask } from "@activescott/apple-jsx/task"

/**
 * This is a helper to use AgentMarkdown to convert Apple-Notes-style HTML (i.e. non-confirming HTML) to markdown.
 * At one point, I couldn't get AgentMarkdown ro run in OSAJavaScript, so it runs AgentMarkdown by spawning a separate process and route input and output via files.
 * I later figured out how to do that, so maybe this is all useless now, but it serves as an interesting demo/test of some of the Objective-C it is referencing.
 */
export function writeHtmlToMarkdownFile(html, outputPath): void {
  // first write the HTML string to a temp file:
  const slash = outputPath.lastIndexOf("/")
  const htmlFilePart = outputPath.slice(slash ? slash : 0)
  const htmlTempFile = `/tmp/${getRandomInt(
    Number.MAX_SAFE_INTEGER
  )}-${htmlFilePart}`
  writeTextToFile(html, htmlTempFile)

  const agentMarkdownPath = resolveRelativePath(
    "node_modules/.bin/agentmarkdown"
  )
  const outPath = resolveRelativePath(outputPath)
  //console.log("creating file at path", outPath)
  createFileAtPath(outPath)
  //console.log("fileHandleForWritingAtPath...")
  const outHandle = fileHandleForWritingAtPath(outPath)
  //console.log("launchTask...")
  launchTask(agentMarkdownPath, [htmlTempFile], null, outHandle)
  //console.log("launchTask complete.")
}

function getRandomInt(max): number {
  return Math.floor(Math.random() * Math.floor(max))
}
