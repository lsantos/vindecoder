"use strict";
exports.__esModule = true;
var express = require("express");
var request = require("request");
var cors = require('cors');
var config = require("./config.json");
var app = express();
app.use(cors());
var apiKey = config.api_key;
app.get('/', function (req, res) {
    res.send('The URL for products is http://localhost:8000/api/vin/:vin_no');
});
app.get('/api/vin/:vin_no', function (req, res, next) {
    getVinDecoded(req.params.vin_no, res, next);
});
function getVinDecoded(vin_no, res, next) {
    var options = {
        url: "http://api.marketcheck.com/v1/vin/" + vin_no + "/specs?api_key=" + apiKey,
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Host: 'marketcheck-prod.apigee.net'
        }
    };
    request.get(options, function (err, resp, body) {
        if (err) {
            console.error("Error calling api", err);
            next(err);
        }
        else {
            res.json(JSON.parse(body));
        }
    });
}
var server = app.listen(8000, "localhost", function () {
    console.log("Listening on localhost:8000");
});
