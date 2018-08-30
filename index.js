// import express
const express = require('express');
const path = require('path');
const request = require('request');
// create instance of express server 
const app = express();
app.use(express.static('public'));

// setup first route 
// append this directory to index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));
// proxy request
app.get('/api', (req, res) => {
    res.type('Content-Type', 'text/plain');
    return request(
        'http://app.linkedin-reach.io/words',
        (error, response, body) => {
            return res.send(body);
        }
    );
});
app.listen(3000);