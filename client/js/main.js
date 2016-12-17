require('bootstrap');
var Yelp = require('yelp');

'use strict';

var yelp = new Yelp({
    consumer_key: 'haMRKQsDTMhxfcq4pGsxCw',
    consumer_secret: 'vmacEp_7fJXvwMNB6Bo2eK1GHzc',
    token: 'ilgRTi7Lgt4Hwwhx_Nq0GzS0A4B9PRjm',
    token_secret: 'Y3sYtASKK5rOAxASXGy56ZMep2g'
})

window.onload = init;

function init(){
    document.querySelector("#search").onclick = yelp.search({
        term: 'food',
        location: '14586'
    }).then(function.data) {
        console.dir(data);
    }
}