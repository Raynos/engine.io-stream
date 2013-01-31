var ReadWriteStream = require("read-write-stream")
    , WriteStream = require("write-stream")

module.exports = EngineStream

function EngineStream(socket) {
    var queue = ReadWriteStream(write, end)
        , stream = queue.stream

    socket.on("error", stream.emit.bind(stream, "error"));

    socket.on("open", function () {
        stream.emit("connect")
    })

    socket.on("close", function (reason, description) {
        queue.end()
        stream.emit("closed", reason, description)
        // pipe all the data somewhere to ensure it ends
        stream.pipe(WriteStream(noop))
    })
    socket.on("message", queue.push)

    function write(chunk) {
        socket.send(chunk)
    }

    function end() {
        socket.close()
    }

    return stream
}

function noop() {}
