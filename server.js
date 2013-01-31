var EngineIO = require("engine.io")
    , EventEmitter = require("events").EventEmitter
    , EngineStream = require("./stream")

module.exports = EngineServer

function EngineServer(onConnection) {
    var engine = new EventEmitter
        , servers = []

    engine.attach = attach
    engine.close = close

    if (onConnection) {
        engine.on("connection", onConnection)
    }

    return engine

    function attach(httpServer, options) {
        options = options || {}

        if (typeof options === "string") {
            options = { resource: options }
        }

        if (options.resource[0] === "/") {
            options.resource = options.resource.substr(1)
        }

        var server = EngineIO.attach(httpServer, options)

        servers.push(server)

        server.on("error", engine.emit.bind(engine, "error"));

        server.on("connection", function (socket) {
            engine.emit("connection", EngineStream(socket))
        })
    }

    function close() {
        servers.forEach(invoke("close"))
    }
}

function invoke(method) {
    return function (obj) {
        return obj[method].call(obj)
    }
}
