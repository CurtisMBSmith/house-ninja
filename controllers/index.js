var fs = require('fs');
var UserCntrl = require('./UserController.js');
var HouseholdCntrl = require('./HouseholdController.js');

exports.index = function(req, res) {
    res.set('Content-Type', 'text/html');

    fs.readFile(__dirname + '/../views/index.html', function(err, data) {
        if (err) {
            console.log('err: ' + err);
            res.status(404);
            res.send('<html><head/><body>File not found.</body></html>');
            return;
        }

        res.send(data);
    });
};

exports.UserCntrl = UserCntrl;
exports.HouseholdCntrl = HouseholdCntrl;