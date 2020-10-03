import expect from "expect.js"
import { describe, test } from "./zoot"
import * as fs from "@activescott/apple-jsx/fs"
import * as process from "@activescott/apple-jsx/process"
import * as task from "@activescott/apple-jsx/task"

describe("objective-c api", () => {
  describe("process", () => {
    test("process.env() should return map", () => {
      const env = process.env()
      expect(env).to.be.an("object")
      expect(env).to.have.property("HOME")
      expect(env["HOME"]).to.be.a("string")
    })
  })
})

describe("jsx abstractions", () => {
  describe("fs", () => {
    // resolveRelativePath is good test because resolveRelativePath is an implementation in apple-jsx that uses foundation framework and OSA globals from apple-jsx-env
    test("resolveRelativePath", () => {
      expect(fs.resolveRelativePath("~/")).to.equal(process.env()["HOME"])
    })

    test("writeTextToFile", () => {
      const filePath =
        $.NSTemporaryDirectory().js + `tempfile-${new Date().valueOf()}`
      const testText = `test ${Math.random()} text`
      fs.writeTextToFile(testText, filePath)
      const data = $.NSFileManager.alloc.contentsAtPath(
        $.NSString.alloc.initWithUTF8String(filePath)
      )
      const actual = $.NSString.alloc.initWithDataEncoding(
        data,
        $.NSUTF8StringEncoding
      )
      expect(testText).to.equal(actual.js)
    })
  })

  describe("task", () => {
    test("launchTask simplest", () => {
      // expect not to throw
      task.launchTask("/bin/ls", [], null, null)
    })

    test("launchTask args", () => {
      // expect NOT to throw
      task.launchTask("/bin/ls", ["/bin/ls"], null, null)
    })

    test("launchTask args should fail", () => {
      // expect TO throw due to /foo not existing
      expect(() =>
        task.launchTask("/bin/ls", ["/foo"], null, null)
      ).to.throwException(
        new RegExp("Process /bin/ls /foo failed with exist status '1'")
      )
    })

    test.todo("launchTask stdin")
    test.todo("launchTask stdout")
  })
})

describe("expect.js", () => {
  test("expect.js is working", () => {
    let didThrow = false
    try {
      expect(false).to.be.ok()
    } catch (err) {
      didThrow = true
    }
    if (!didThrow) {
      throw new Error("something wrong with assertions!")
    }
  })
})
