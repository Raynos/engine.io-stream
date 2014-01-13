# engine.io-stream

[![build status][1]][2]
[![NPM version][3]][4]
[![Davis Dependency status][9]][10]

simple interface to engine.io via node streams

The API is pretty much the same as [shoe](https://github.com/substack/shoe)

## Example Client

```js
var engine = require("engine.io-stream")

// attach to an engine.io server at url '/numbers'
var stream = engine("/numbers")

stream.on('data', function(data) {
    console.log(data)
    stream.write('ack')
})
```

## Example Server

```js
var http = require("http")
var EngineServer = require("engine.io-stream")

// engines need to attach to server instances (see below)
var server = http.createServer(...)

var engine = EngineServer(function(stream) {
    // send back some numbers, you know...for fun
    var iv = setInterval(function () {
        stream.write(String(Math.floor(Math.random() * 2)))
    }, 250)

    stream.once("end", function () {
        clearInterval(iv)
    })

    stream.pipe(process.stdout, { end : false })
})

// expose the engine instance at this url
engine.attach(server, "/numbers")

server.listen(8080, function() {
    console.log("Listening on port 8080")
})
```

## Installation

`npm install engine.io-stream`

## Contributors

 - Raynos
 - shtylman
 - juliangruber
 - hij1nx

## Licence MIT

  [1]: https://secure.travis-ci.org/Raynos/engine.io-stream.png
  [2]: https://travis-ci.org/Raynos/engine.io-stream
  [3]: https://badge.fury.io/js/engine.io-stream.png
  [4]: https://badge.fury.io/js/engine.io-stream
  [5]: https://coveralls.io/repos/Raynos/engine.io-stream/badge.png
  [6]: https://coveralls.io/r/Raynos/engine.io-stream
  [7]: https://gemnasium.com/Raynos/engine.io-stream.png
  [8]: https://gemnasium.com/Raynos/engine.io-stream
  [9]: https://david-dm.org/Raynos/engine.io-stream.png
  [10]: https://david-dm.org/Raynos/engine.io-stream
  [11]: https://ci.testling.com/Raynos/engine.io-stream.png
  [12]: https://ci.testling.com/Raynos/engine.io-stream
