#!/usr/bin/env sh
rm -f ./index.bundle.js
./node_modules/.bin/webpack-cli
osascript -l JavaScript index.bundle.js
