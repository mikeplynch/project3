var fs = require('fs');

var index = fs.readFileSync(__dirname + "/../client/index.html");

var getIndex = function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html'});
    response.write(index);
    response.end();
};

module.exports.getIndex = getIndex;