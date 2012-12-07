var mapping = require("mapping-stream")
    , append = require("insert/append")

    , engine = require("../../index")

    , body = document.body
    , stream = engine("/invert")

stream
    .pipe(mapping(function (chunk) {
        append(body, String(chunk))
        return String(Number(chunk) ^ 1)
    }))
    .pipe(stream)
