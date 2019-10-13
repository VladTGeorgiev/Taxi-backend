require('dotenv').config();

const express = require('express');
const router = express.Router();
const input = require('./data.json');
const fs = require('fs');
const request = require("request");

const options = { method: 'GET',
  url: process.env.FOREIGN_DATABASE,
  qs: { latitude: process.env.LATITUDE, longitude: process.env.LONGITUDE, count: process.env.COUNT }
};

const headers = {
    'Access-Control-Allow-Origin': process.env.FRONTEND_URL,
    'Access-Control-Allow-Methods': 'POST, GET',
};

router.get('/', (req, res) => {
    const data = JSON.stringify(input)
    res.writeHead(200, headers);
    res.end(data);
});

router.post('/', (req, res) => {
    const update = req.body.updateRequest
    if (update === 'update') {
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            fs.writeFile('data.json', body, (err) => {
              if (error) throw new Error(error);
              res.writeHead(200, headers);
              res.end(body);
            });
          });
    }
});

module.exports = router