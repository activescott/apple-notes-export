import { writeTextToFile, resolveRelativePath, createFileAtPath, fileHandleForWritingAtPath } from "../../packages/jsx/abstractions/fs"
import { launchTask } from "../../packages/jsx/abstractions/task"

/**
 * This is a helper to use AgentMarkdown to convert Apple-Notes-style HTML (i.e. non-confirming HTML) to markdown.
 * I couldn't get AgentMarkdown ro run in OSAJavaScript, so we run AgentMarkdown by spawning a separate process and route input and output via files
 */

export function writeHtmlToMarkdownFile(html, outputPath) {
  // first write the HTML string to a temp file:
  const slash = outputPath.lastIndexOf("/")
  const htmlFilePart = outputPath.slice(slash ? slash : 0)
  const htmlTempFile = `/tmp/${getRandomInt(Number.MAX_SAFE_INTEGER)}-${htmlFilePart}`
  writeTextToFile(html, htmlTempFile)

  const agentMarkdownPath = resolveRelativePath("node_modules/.bin/agentmarkdown")
  const outPath = resolveRelativePath(outputPath)
  //console.log("creating file at path", outPath)
  createFileAtPath(outPath)
  //console.log("fileHandleForWritingAtPath...")
  const outHandle = fileHandleForWritingAtPath(outPath)
  //console.log("launchTask...")
  launchTask(agentMarkdownPath, [htmlTempFile], null, outHandle)
  //console.log("launchTask complete.")
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
