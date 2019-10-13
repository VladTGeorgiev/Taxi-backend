require('dotenv').config()
const express = require('express')
const router = express.Router()
const input = require('../data.json')
const fs = require('fs');
const request = require("request");

const options = { method: 'GET',
  url: process.env.FOREIGN_DATABASE,
  qs: { latitude: process.env.LATITUDE, longitude: process.env.LONGITUDE, count: process.env.COUNT }
};

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
};

router.get('/', (req, res) => {
    const data = JSON.stringify(input)
    res.writeHead(200, headers);
    res.end(data);
})

router.post('/', (req, res) => {
    const update = req.body.updateRequest
    if (update === 'update') {
        console.log(update)
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            fs.writeFile('data.json', body, (err) => {
              if (err) throw err;
            });
          });
        res.writeHead(200, headers);
        res.end('{updateRequest: finished}');
    } else {
        res.writeHead(200, headers);
        res.end('{updateRequest: Server Error}');
    }

})

module.exports = router