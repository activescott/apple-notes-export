# apple-notes-export

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

A script to export Apple Notes to TiddlyWiki, Boostnote, and more!

## Usage

It must be run on macOS under the account/login that you want to access Apple Notes data from.

To run the script run the following from the root of the repo:

Export to tiddlywiki:

    yarn start tiddlywiki

It will export all notes, next go to the output directory that it exported to (by default to `~/Downloads/apple-notes-export/tiddlywiki/`)

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

## Boostnote

TODO!!!

**NOTE: Boostenote support worked at one moment in time and I imagine it is still pretty close, but it definitely needs work. I'd love contributions!**

    # export to boostnote:
    yarn start boostnote

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

- Lint: @activescott/lint-config
- shebang bin to make this easier to run than using `yarn start` so it could be run with `npx` directly.
- Break `packages/jsx/*` out into it's own published package. A fair bit of value has built up in there that is probably worth publishing and testing independently.
