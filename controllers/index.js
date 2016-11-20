/**
 * do something with the user model
 * var User = require('../models/user');
 */

// var express = require('express');
var fs = require('fs');
var UserCntrl = require('./UserController.js');

exports.index = function(req, res) {
    res.set('Content-Type', 'text/html');

    fs.readFile(__dirname + '/../views/index.html', function(err, data) {
        if (err) {
            console.log('err: ' + err);
            res.send('<html><head/><body>empty: ' + __dirname + '</body></html>');
            return;
        }

        res.send(data);
    });
};

exports.UserCntrl = UserCntrl;
