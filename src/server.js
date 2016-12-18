var http = require('http');
var url = require('url');
var fs = require('fs');
var query = require('querystring');
var Yelp = require('yelp');
var fs = require('fs');

var index = fs.readFileSync(__dirname + "/../client/index.html");

var yelp = new Yelp({
    consumer_key: 'haMRKQsDTMhxfcq4pGsxCw',
    consumer_secret: 'vmacEp_7fJXvwMNB6Bo2eK1GHzc',
    token: 'O8hE_LFofH1USohdiAuaqiobHSDq-wdp',
    token_secret: 'PQX6j2wd-opvB3o9NlPU98er8DU'
});

var port = process.env.PORT || 3000;

function onRequest(req, res) {

    var parsedUrl = url.parse(req.url);

    var params = query.parse(parsedUrl.query);

    if(parsedUrl.pathname === "/search") {
        yelpSearch(req, res, params);
    }

    else {
        res.writeHead(200, { "Content-Type" : "text/html"} );

        res.write(index);

        res.end();
    }
}

function yelpSearch(request, response, params){

    var search = yelp.search({
        term: params.term,
        location: params.location
    });

    search.then(function(data){
        response.writeHead(200, { "Content-Type" : "application/json"});

        response.write(JSON.stringify(data));

        response.end();
    });

    search.catch(function(error){
        console.error(error);

        response.writeHead(400, { "Content-Type" : "application/json"});

        response.write(JSON.stringify(error));

        response.end();

    });
}

http.createServer(onRequest).listen(port);

console.log("Listening on localhost: " + port);

