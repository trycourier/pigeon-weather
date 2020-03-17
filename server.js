// server.js

// init project
const express = require("express");
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const router = require("./routes");
const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(express.json()) // for parsing application/json

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

// http://expressjs.com/en/starter/basic-routing.html
app.use("/api", router);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.get("*", function(request, response) {
  console.log("meee", config.output.publicPath)
  response.sendFile(__dirname + "/public/index.html");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
