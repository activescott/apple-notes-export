# apple-notes-export

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

A tool to export Apple Notes to Markdown, TiddlyWiki, Boostnote, and more!

## Usage

It must be run on macOS under the account/login that you want to access Apple Notes data from.

To run the tool run the following from the root of the repo:

NOTE: Tiddlywiki essentially stores files as markdown files (e.g. `filename.md`) with an adjacent `.meta` file (e.g. `filename.md.meta`). So if you want your Apple Notes exported to plain markdown files use TiddlyWiki.

To export to tiddlywiki/markdown:

    npm start tiddlywiki

The above will export all notes, next go to the output directory that it exported to (by default to `~/Downloads/apple-notes-export/tiddlywiki/`)

    cd ~/Downloads/apple-notes-export/tiddlywiki/

Create a folder for a new wiki that includes server-related components

    npx tiddlywiki wiki --init server

Now copy the exported tiddlers into the new wiki dir:

    mv ./tiddlers ./wiki/tiddlers

Start the tiddlywiki server:

    npx tiddlywiki wiki --listen

Visit http://127.0.0.1:8080/ in your browser.

Click on the **More** tab on the right sidebar. Then select the **All** tab below it. You should see ALL of your notes!

Click on the **More** tab on the right sidebar. Then select the **Tags** tab below it. You should see tags for all of your folders from Apple Notes!

If you want to filter by a specific note use the `--filter` arg:

    npm run start -- tiddlywiki --filter "my note name"

For more options, run

    npm run start -- tiddlywiki --filter "my note name"

## Boostnote

TODO!!!

**NOTE: Boostenote support worked at one moment in time and I imagine it is still pretty close, but it definitely needs work. I'd love contributions!**

    # export to boostnote:
    npm start boostnote

## Contributing

YOU are welcome to contribute! Please submit pull requests!

## Developing

The big thing to note is that on the surface this looks like a Node.js/TypeScript project but it is not! It uses the [`osascript` command-line tool](https://support.apple.com/guide/terminal/automate-tasks-using-applescript-and-terminal-trml1003/mac) to run the TypeScript (converted to JavaScript and bundled with Webpack) in Apple's "JavaScript for Automation" (JXA) which is part of the [Open Scripting Architecture (OSA)](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptX/Concepts/osa.html#//apple_ref/doc/uid/TP40001571). It makes fairly extensive use of the Objective/C bridging to directly reference Objective/C SDK to make this all work. There are a bunch of abstractions and types in the subdirectories of `packages/jsx/` that make this more manageable.

### Developing with JavaScript for Automation

- You must use the osascript command-line tool to run it.
  MISC Syntax notes:

* To send the get event to the external entity and return its value, call the property as a function!
  Debugging Notes:
* enter the command `debugger` into a script to stop it in safari's debugger.
* See https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-11.html#//apple_ref/doc/uid/TP40014508-CH110-SW3

## Todo

- Get apple-notes-export package working again:
  - Use [bundleDependencies](https://docs.npmjs.com/files/package.json#bundleddependencies) to bundle all depends on the apple-notes-export package.
  - Some simple test for apple-notes-export that mocks underlying AppleNotes API
- Tests:
  - for some integration tests it might be reasonable to fill some folders with json files representing the raw directories and AppleNotes content
  - exporters: unit tests (mock out jsx, etc.)
    - unit test `exportNote` function of each exporter, mock `NotesNote`
  - for `packages/Applications/AppleNotes`:
    - mock out the `raw*` stuff and put a unit test for each.
- shebang bin to make this easier to run than using `npm start` so it could be run with `npx` directly.
- Publish `packages/apple-jsx-env` & `packages/apple-jsx`. A fair bit of value has built up in there that is probably worth publishing and testing independently.
