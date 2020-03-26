"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const request_1 = require("request");
const app = express();
const api_key = "UIWbCjtdylzxuKCIVvGCrw04dQQ0xaGy";
app.get('/', (req, res) => {
    res.send('The URL for products is http://localhost:8000/api/vin/:vin_no');
});
app.get('/api/vin/:vin_no', (req, res) => {
    var json = getVinDecoded(req.params.vin_no);
    console.log("hi", json);
    res.json(json);
});
function getVinDecoded(vin_no) {
    console.log('http://api.marketcheck.com/v1/vin/${vin_no}/specs?api_key=${api_key}');
    var options = {
        url: 'http://api.marketcheck.com/v1/vin/${vin_no}/specs?api_key=${api_key}',
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Host: 'marketcheck-prod.apigee.net'
        }
    };
    request_1.default.get(options, function (err, resp, body) {
        return body;
    });
}
const server = app.listen(8000, "localhost", () => {
    console.log(`Listening on localhost:8000`);
});
