#!/usr/bin/env node
/// <reference types="@types/node" />
/**
 * This is intended to just be a simple CLI interface for dealing with the bundle running inside of the OSA/JSX host.
 * It runs in **node instead of osascript** and manages executing the osascript command
 */
import { spawnSync, SpawnSyncOptions } from "child_process"
import * as path from "path"

async function main(): Promise<void> {
  const opts: SpawnSyncOptions = {
    stdio: "inherit",
    cwd: __dirname,
  }

  //osascript -l JavaScript dist/bundle.js
  const args: string[] = [
    "-l",
    "JavaScript",
    path.resolve(__dirname, "./bundle.js"),
    // eslint-disable-next-line no-magic-numbers
    ...process.argv.slice(2),
  ]
  const { status } = spawnSync("osascript", args, opts)
  process.exit(status)
}

main()
