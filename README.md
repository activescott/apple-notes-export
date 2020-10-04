# apple-notes-export

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

A hack to free your notes from Apple Notes to markdown for use in TiddlyWiki, Boostnote, and more!

## Usage

This is a hack at this point and I haven't published any of the packages to npm. I'm open to publishing them to make them easier to use if people are interested. Just [submit a request here](https://github.com/activescott/apple-notes-export/issues) if you're interested.

#### Prerequisites

It must be run on macOS under the account/login that you want to access Apple Notes data from.
You'll need a recent version of macOS and a recent node.js installed.

### Building

First thing you'll need to do is build it. Just run [`/build.sh`](blob/master/build.sh) from the root.

### Running & Exporting

To run the tool run the following from the root of the repo. Running without any arguments will print the help:

    node ./packages/apple-notes-export-app/dist/cli.js

To export to markdown/tiddlywiki:

    node ./packages/apple-notes-export-app/dist/cli.js tiddlywiki

NOTE: Tiddlywiki essentially stores files as markdown files (e.g. `filename.md`) with an adjacent `.meta` file (e.g. `filename.md.meta`). So if you want your Apple Notes exported to plain markdown files use TiddlyWiki.
The above will export all notes, next go to the output directory that it exported to (by default to `~/Downloads/apple-notes-export/tiddlywiki/`)

#### Opening in TiddlyWiki

To open and run TiddlyWiki to see your notes use the following steps:

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

    node ./packages/apple-notes-export-app/dist/cli.js tiddlywiki --filter "my note name"

For more options, run:

    node ./packages/apple-notes-export-app/dist/cli.js --help

### Exporting to Boostnote

**NOTE: Boostenote support worked at one moment in time and I imagine it is still pretty close, but it definitely needs testing / work. I'd love contributions!**

    # export to boostnote:
    node ./packages/apple-notes-export-app/dist/cli.js boostnote

## Contributing

YOU are welcome to contribute! Please submit pull requests!

## Developing

The big thing to note is that on the surface this looks like a normal Node.js/TypeScript project but it is not! It uses the [`osascript` command-line tool](https://support.apple.com/guide/terminal/automate-tasks-using-applescript-and-terminal-trml1003/mac) (`osascript` is kinda like node.js but _much_ more limited) to run the TypeScript (converted to JavaScript and bundled with Webpack) in Apple's "JavaScript for Automation" (JXA) which is part of the [Open Scripting Architecture (OSA)](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptX/Concepts/osa.html#//apple_ref/doc/uid/TP40001571). It makes fairly extensive use of the Objective/C bridging to directly reference Objective/C SDK to make this all work.

### Building

To build all the packages run [`/build.sh`](blob/master/build.sh). There's no magic in there so it's a good reference to understand what's going on.

### Packages / Repo Layout

For an overview of the packages see [the readme in the packages folder](blob/master/packages/readme.md).

### Notes on Developing with JavaScript for Automation

- To send the get event to the external entity and return its value, call the property as a function!
- enter the command `debugger` into a script to stop it in safari's debugger: See https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-11.html#//apple_ref/doc/uid/TP40014508-CH110-SW3

## References

- [JavaScript for Automation Release Notes](https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/Introduction.html#//apple_ref/doc/uid/TP40014508-CH111-SW1) is the official reference for JavaScript for Automation (JSX) which is the component that provides the JavaScript language in the Open Scripting Architecture (OSA) environment (of which the other notable language is AppleScript).
- [Open Scripting Architecture (OSA)](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptX/Concepts/osa.html#//apple_ref/doc/uid/TP40001571) is the official reference for the Open Scripting Architecture built into macOS.
- [Mac Automation Scripting Guide](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/index.html#//apple_ref/doc/uid/TP40016239-CH56-SW1) is an archived summary of AppleScript and links to JavaScript for Automation topics.
- [Foundation Framework in Apple Developer Documentation](https://developer.apple.com/documentation/foundation?language=objc) is the Foundation Framework which provides access to the "essential data types, collections, and operating-system services to define the base layer of functionality for your app" for any macOS application.
