import * as express from "express";
const request = require("request");
const cors = require('cors')
const config = require("./config.json")

const app = express();
app.use(cors())
const apiKey = config.api_key;

app.get('/', (req, res) => {
     res.send('The URL for products is http://localhost:8000/api/vin/:vin_no');
});

app.get('/api/vin/:vin_no', (req, res, next) => {
     getVinDecoded(req.params.vin_no, res, next); 
});


function getVinDecoded(vin_no, res, next) {
  var options =  {
        url: `http://api.marketcheck.com/v1/vin/${vin_no}/specs?api_key=${apiKey}`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Host: 'marketcheck-prod.apigee.net'
        }
      };
   request.get(options, (err, resp, body) => {
      if (err) {
         console.error("Error calling api", err); 
         next(err);
      } else {
        res.json(JSON.parse(body));
      }
      
   });    

 }

const server = app.listen(8000, "localhost", () => {
    console.log(`Listening on localhost:8000`);
});

