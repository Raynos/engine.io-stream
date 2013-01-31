var EngineSocket = require("engine.io-client").Socket

    , EngineStream = require("./stream")

module.exports = EngineClient

function EngineClient(options) {
    options = options || {}

    if (typeof options === "string") {
        options = { path: options }
    }

    if (options.path) {
        options.path = "/engine.io" + options.path
    }

    var socket = new EngineSocket(options)

    return EngineStream(socket)
}
