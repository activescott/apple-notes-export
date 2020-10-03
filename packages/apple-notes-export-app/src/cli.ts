#!/usr/bin/env node
/// <reference types="@types/node" />
/**
 * This is intended to just be a simple CLI interface for dealing with the bundle running inside of the OSA/JSX host.
 * It runs in **node instead of osascript** and manages executing the osascript command
 */
import { spawnSync, SpawnSyncOptions } from "child_process"
import * as path from "path"

async function main() {
  const opts: SpawnSyncOptions = {
    stdio: "inherit"
  }

  //osascript -l JavaScript dist/bundle.js
  const args: string[] = [
    "-l",
    "JavaScript",
    path.resolve("./dist/bundle.js"),
    ...process.argv.slice(2)
  ]
  console.log(`Running osascript with args ${args}...`)
  const { status } = spawnSync("osascript", args, opts)
  console.log("Running osascript complete.")
  process.exit(status)
}

main()
