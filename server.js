#!/usr/bin/env node

var http = require("http"),
    url = require("url"),
    ejs = require("ejs"),
    fs = require("fs"),
    staticResource = require("static-resource"),
    port = 8091,
    serverUrl,
    handler;

serverUrl = "http://localhost:" + port + "/";
handler = staticResource.createHandler(fs.realpathSync("./public"));

http.createServer(function (req, res) {
    var path = url.parse(req.url).pathname;

    if (path === "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(ejs.render(fs.readFileSync("./index.ejs", "utf8")));
        res.end();
    } else {
        if (!handler.handle(path, req, res)) {
            res.writeHead(404);
            res.write("404");
            res.end();
        }
    }
}).listen(port);

console.log("The HTTP server has started at: " + serverUrl);
