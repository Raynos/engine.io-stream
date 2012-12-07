var http = require("http")
    , path = require("path")
    , ecstatic = require("ecstatic")

    , EngineServer = require("../../server")

    , staticHandler = ecstatic(path.join(__dirname, "static"))
    , server = http.createServer(staticHandler)
    , engine = EngineServer(onConnection)

engine.attach(server, "/invert")

server.listen(8080)

console.log("Listening on port 8080")

function onConnection(stream) {
    var iv = setInterval(function () {
        stream.write(String(Math.floor(Math.random() * 2)))
    }, 250)

    stream.once("end", function () {
        clearInterval(iv)
    })

    stream.pipe(process.stdout, { end : false })
}
