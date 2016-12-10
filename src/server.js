var http = require('http');
var htmlHandler = require('./htmlResponses.js');
var jsonHandler = require('./jsonResponses.js');
console.log("Hello World");

var port = process.env.PORT || 3000;

var onRequest = function(request, response) {
    console.log(request.url);
    
    switch(request.url){
        case '/':
            htmlHandler.getIndex(request, response);
            break;
        default: 
            htmlHandler.getIndex(request, response);
            break;
    }
};

http.createServer(onRequest).listen(port);

console.log("Listening on localhost: " + port);