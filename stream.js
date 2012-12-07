var ReadWriteStream = require("read-write-stream")
    , reemit = require("re-emitter/reemit")

module.exports = EngineStream

function EngineStream(socket) {
    var queue = ReadWriteStream(write, end)
        , stream = queue.stream

    reemit(socket, stream, "error")

    socket.on("open", function () {
        stream.emit("connect")
    })

    socket.on("close", function (reason, description) {
        queue.end()
        stream.emit("closed", reason, description)
    })
    socket.on("message", queue.push)

    return stream

    function write(chunk) {
        socket.send(chunk)
    }

    function end() {
        socket.close()
    }
}
