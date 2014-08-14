// var ip = "127.0.0.1";
// var server = http.createServer(handler.handleRequest);
// server.listen(port, ip);
// var handler = require("./request-handler");

var express = require('express');
var http = require("http");
var app = express();
var fs = require('fs');
var helpers = require( '../helpers/archive-helpers' );

var port = 8080;
http.createServer( app ).listen( 8080 );
console.log("Listening on port:" + port);

app.use(express.static(__dirname + '/public'));



app.all('*', function(req, res, next) {
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
  res.set('Access-Control-Allow-Headers', 'content-type, accept');
  res.set('Access-Control-Allow-Max-Age', 10);
  next();
});

app.get('*', function(req, res){

  res.send(200, {"greetings": req.path });
});

app.post('*', function(req, res){
  var url = "";
  req.on('data', function( url_chunks ) {
    url += url_chunks;
  });

  req.on('end', function() {
    url = url.substring(4,url.length);
    helpers.addUrlToList( url );
    helpers.downloadUrls( );
    helpers.readListOfUrls( );
    res.status( 302 ).end();
  })
});

app.options('*', function(req, res){
  res.send(200);
});










