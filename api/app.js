var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

if (!fs.existsSync(__dirname + '/config/info.json')) {
    fs.writeFile(__dirname + '/config/info.json', JSON.stringify({
        "info": []
    }))
}

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, HEAD");
    next();
});

app.use('/v1', require('./routes'));


app.listen(8000);