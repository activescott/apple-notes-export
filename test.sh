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

cd "$MYDIR/packages/apple-jsx-testing"
rm -rf ./node_modules
npm i
npm run build
npm run start
