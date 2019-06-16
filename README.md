# apple-notes-export

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

A script for programatically accessing your data in the Apple Notes application.

# Building

The package is written using Apple's "JavaScript for Automation", part of the [Open Scripting Architecture (OSA)](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptX/Concepts/osa.html#//apple_ref/doc/uid/TP40001571) that essentially allows you to use JavaScript to do the same things that AppleScript does. It must be run on macOS under the account/login that you want to access Apple Notes data from.

To run the script run the following from the root of the repo:

    yarn start

Note, you should look at the bottom of hte file to see what the default startup routine is defaulting too.

# Todo

- Boostnote export:
  - Convert HTML to markdown rather than using snippits
    - Use a bundler to create a compatible bundle via Rollup or webpack.
      - refactor accordingly
    - Update build scripts to leverage bundler
  - Allow argv options for a folder to write to
  - Abort if the folder exists (or allow an overrite argv? or make the path unique with an integer or something simple)
  - Write attachments
  - Link in attachments to note
  - Write note title into body as well as title
