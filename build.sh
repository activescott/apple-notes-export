#!/usr/bin/env sh
MYNAME=`basename "$0"`
MYFULLNAME="$PWD/$MYNAME"
MYDIR=`dirname "$MYFULLNAME"`

ORIG_PWD=$PWD

die () {
	echo >&2 "\n$@" #TODO: should probably use printf instead of echo to support newlines. Need to test.
  cd "$ORIG_PWD"
	exit 1
}

function clean () {
  THE_PATH=$1
  if [ -z "$THE_PATH" ]; then
    echo "clean: must provide an argument"
    return 1
  fi
  rm -rf "$THE_PATH/node_modules"
}

function build() {
  THE_PATH=$1
  if [ -z "$THE_PATH" ]; then
    echo "build: must provide an argument"
    return 1
  fi
  echo "\n==========\n"
  echo "Building $THE_PATH..."
  cd "$THE_PATH" || die "Path $THE_PATH doesn't exist?!"
  npm i || die "npm install failed"
  npm run build || die "npm run build failed"
  echo "**********\nSuccess building $THE_PATH\n**********\n" || echo "\n**********\nFAILURE building $THE_PATH\n**********\n"
}

function rebuild () {
  THE_PATH=$1
  if [ -z "$THE_PATH" ]; then
    echo "rebuild: must provide an argument"
    return 1
  fi
  
  clean "$THE_PATH" || die "CLEAN failed!!"
  build "$THE_PATH" || die "BUILD failed!!"
  
}

rebuild "$MYDIR/packages/apple-jsx-env"
rebuild "$MYDIR/packages/apple-jsx"
rebuild "$MYDIR/packages/apple-jsx-apps"
rebuild "$MYDIR/packages/apple-jsx-testing"
rebuild "$MYDIR/packages/apple-notes-export-app"