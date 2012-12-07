# engine.io-stream

Make engine.io a valid node stream

The API is pretty much the same as [shoe][1]

## Example Client

```js
var mapping = require("mapping-stream")
    , append = require("insert/append")

    , engine = require("engine.io-stream")

    , body = document.body
    , stream = engine("/invert")

stream
    .pipe(mapping(function (chunk) {
        append(body, String(chunk))
        return String(Number(chunk) ^ 1)
    }))
    .pipe(stream)
```

## Example Server

```js
var http = require("http")
    , path = require("path")
    , ecstatic = require("ecstatic")

    , EngineServer = require("engine.io-stream/server")

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
```

## Installation

`npm install engine.io-stream`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://github.com/substack/shoe
