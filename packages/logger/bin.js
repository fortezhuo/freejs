#! /usr/bin/env node
var split = require("split2")
var freeLogger = require("./")()
var fs = require("fs")
var dayjs = require("dayjs")
var isProd = process.env.NODE_ENV === "production"
var filename = `./log/log_${dayjs().format("YYMMDDHHmm")}.log`

var input = process.stdin
var output = isProd ? fs.createWriteStream(filename) : process.stdout

input.pipe(split(freeLogger)).pipe(output)
