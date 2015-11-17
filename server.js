
/**
 * Created by robertmujica on 08/11/15.
 */

//https://detectlanguage.com/private#batch-requests

var request = require('request');
var URI = require("uri-js");
var fs = require('fs');
var jsonPath = require('JSONPath');
var util = require('util');
var encoder = require('encoder.js');
var extract = require('url-querystring');

var baseURI = 'http://ws.detectlanguage.com/0.2/detect';
var key = '4392d0dfdf3a7344a500761f34ccf419';
//Sample uri call
//http://ws.detectlanguage.com/0.2/detect?q=muito praze&key=4392d0dfdf3a7344a500761f34ccf419"));

fs.readFile('testData.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);

    var list = jsonPath.eval(obj, '$..text');
    for(var i = 0; i < list.length; i++){
        var q = list[i];
        var fullURI = util.format('%s?q=%s&key=%s', baseURI, q, key);
        var encodedURI = URI.serialize(URI.parse(fullURI));

        request(encodedURI, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var fbResponse = JSON.parse(body);
                var query = encoder.decodeURI(this.href);
                var uriObject = extract(query);
                console.log("Got a response: ", fbResponse.data, " Text : ", uriObject.qs.q);
            } else {
                console.log("Got an error: ", error, ", status code: ", response.statusCode);
            }
        });
    }
    console.log(list);
});

