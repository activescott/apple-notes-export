# apple-notes-export

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

A script for programatically accessing your data in the Apple Notes application.

# Building

The package is written using Apple's "JavaScript for Automation", part of the [Open Scripting Architecture (OSA)](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptX/Concepts/osa.html#//apple_ref/doc/uid/TP40001571) that essentially allows you to use JavaScript to do the same things that AppleScript does. It must be run on macOS under the account/login that you want to access Apple Notes data from. It uses the `osascript` command-line tool to run it

To run the script run the following from the root of the repo:

    # export to boostnote:
    yarn start boostnote

    # export to tiddlywiki:
    yarn start tiddlywiki

Note, you should look at the bottom of hte file to see what the default startup routine is defaulting too.

# Developing with JavaScript for Automation

- You must use the osascript command-line tool to run it.
  MISC Syntax notes:

* To send the get event to the external entity and return its value, call the property as a function!
  Debugging Notes:
* enter the command `debugger` into a script to stop it in safari's debugger.
* See https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-11.html#//apple_ref/doc/uid/TP40014508-CH110-SW3

## Other helpful references:

- Working with files/folders (scroll to the bottom for JavaScript examples): https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/ReferenceFilesandFolders.html#//apple_ref/doc/uid/TP40016239-CH34-SW1
- Working with Objective-C Frameworks & Objects: https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW18

# Todo

- Boostnote export:

  - Convert HTML to markdown rather than using snippits:
    - Use a bundler to create a compatible bundle via Rollup or webpack.
      - Rollup: Tried but it was gross. Webpack better. **Next time I'll start w/ Typescript.**
      - Update build scripts to leverage bundler
    - Change to TypeScript (targeting ES5?)

* Attempt to try to convert to markdown (MD)/plaintext:

  - https://github.com/activescott/agentmarkdown

* Write attachments
* Link in attachments to note
* refactor writing:
  - Create a note writer strategy. One for boostnote
  - Future: for raw html/md files
* Write note title into body as well as title
* Allow argv options for a folder to write to
  - Abort if the folder exists (or allow an overwrite argv? or make the path unique with an integer or something simple)
