var Stream = require('stream').Stream;

function EngineStream(socket) {
    var stream = new Stream();

    socket.on("error", stream.emit.bind(stream, "error"))
    socket.on("open", stream.emit.bind(stream, "connect"))
    socket.on("close", stream.emit.bind(stream, "close"))

    // forward data
    socket.on("message", stream.emit.bind(stream, "data"))

    // forwarding write
    stream.write = socket.write.bind(socket)

    return stream
}

module.exports = EngineStream

