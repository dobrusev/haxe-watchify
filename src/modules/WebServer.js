var http = require('http');
var fs = require('fs');
var path = require('path')
var Console = require('./Console');

var DEFAULT_SERVER_PORT = 30000;
var FILES_EXT = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript'
};

function WebServer(){

  return {
    start: start
  }
}

function start(){
  var server = http.createServer(routeRequests);
  server.listen(DEFAULT_SERVER_PORT);

  Console.monitorStart();
}

function routeRequests(request, response){
  var fileRequest = request.url.toString();
  sendStaticFile(response, fileRequest, FILES_EXT[getFileExt(fileRequest)]);
}

function getFileExt(file){
  return path.extname(file).substr(1);
}

function sendStaticFile(response, file, type){
  //TODO: reply static server file
  fs.readFile(__dirname + "/../../monitor" + file, function(err, data){
    if(err){
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    response.writeHead(200, {'Content-Type':  type});
    response.write(data);
    response.end();
  });
}

module.exports = WebServer;
