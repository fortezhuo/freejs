var dayjs = require("dayjs")
var jsonParse = require("fast-json-parse")
var chalk = require("chalk")
var nl = "\n"

var isProd = process.env.NODE_ENV === "production"

var emojiLog = {
  warn: `⚠️ ${isProd ? "" : " "}WARN  |`,
  info: "✅ INFO  |",
  error: "⛔️ ERROR |",
  debug: "🐛 DEBUG |",
  fatal: "💀 FATAL |",
  trace: "🔍TRACE  |",
}

function isObject(input) {
  return Object.prototype.toString.apply(input) === "[object Object]"
}

function isPinoLog(log) {
  return log && log.hasOwnProperty("level")
}

module.exports = FreeLogger

function FreeLogger() {
  return parse

  function parse(inputData) {
    var obj
    if (typeof inputData === "string") {
      var parsedData = jsonParse(inputData)
      if (!parsedData.value || parsedData.err || !isPinoLog(parsedData.value)) {
        return inputData + nl
      }
      obj = parsedData.value
    } else if (isObject(inputData) && isPinoLog(inputData)) {
      obj = inputData
    } else {
      return inputData + nl
    }

    if (!obj.level) return inputData + nl
    if (!obj.message) obj.message = obj.msg
    if (typeof obj.level === "number") convertLogNumber(obj)

    return output(obj) + nl
  }

  function convertLogNumber(obj) {
    if (obj.level === 10) obj.level = "trace"
    if (obj.level === 20) obj.level = "debug"
    if (obj.level === 30) obj.level = "info"
    if (obj.level === 40) obj.level = "warn"
    if (obj.level === 50) obj.level = "error"
    if (obj.level === 60) obj.level = "fatal"
  }

  function formatDate(time) {
    var prettyDate = dayjs(time).format("YYYY-MM-DD HH:mm:ss")
    return isProd ? prettyDate : chalk.gray(prettyDate)
  }

  function formatPID(pid) {
    return `[${pid}]`
  }

  function formatLevel(level) {
    return emojiLog[level]
  }

  function formatNs(name) {
    return isProd ? name : chalk.cyan(name)
  }

  function formatName(name) {
    return isProd ? name : chalk.blue(name)
  }

  function formatMessageName(message) {
    if (message === "request") return "- REQUEST - "
    if (message === "response") return "- RESPONSE -"
    return message
  }

  function formatMessage(obj) {
    var msg = formatMessageName(obj.message)
    if (isProd) return msg
    var pretty
    if (obj.level === "error") pretty = chalk.red(msg)
    if (obj.level === "trace") pretty = chalk.white(msg)
    if (obj.level === "warn") pretty = chalk.magenta(msg)
    if (obj.level === "debug") pretty = chalk.yellow(msg)
    if (obj.level === "info" || obj.level === "userlvl")
      pretty = chalk.green(msg)
    if (obj.level === "fatal") pretty = chalk.white.bgRed(msg)
    return pretty
  }

  function formatUrl(url) {
    return isProd ? url : chalk.white(url)
  }

  function formatMethod(method) {
    return isProd ? method : chalk.white(method)
  }

  function formatStatusCode(statusCode) {
    statusCode = statusCode || "xxx"
    return isProd ? statusCode : chalk.white(statusCode)
  }

  function formatStack(stack) {
    return stack ? nl + stack : ""
  }

  function noEmpty(val) {
    return !!val
  }

  function output(obj) {
    var output = []

    if (!obj.level) obj.level = "userlvl"
    if (!obj.name) obj.name = ""
    if (!obj.ns) obj.ns = ""

    output.push(formatDate())
    output.push(formatPID(obj.pid))
    output.push(formatLevel(obj.level))
    output.push(formatNs(obj.ns))
    output.push(formatName(obj.name))
    output.push(formatMessage(obj))

    var req = obj.req
    var res = obj.res
    var statusCode = res ? res.statusCode : obj.statusCode
    var method = req ? req.method : obj.method
    var url = req ? req.url : obj.url
    var stack =
      obj.level === "fatal" || obj.level === "error"
        ? obj.stack || (obj.err && obj.err.stack)
        : null

    if (method != null) {
      output.push(formatMethod(method))
      output.push(formatStatusCode(statusCode))
    }
    if (url != null) output.push(formatUrl(url))
    if (stack != null) output.push(formatStack(stack))

    return output.filter(noEmpty).join(" ")
  }
}
