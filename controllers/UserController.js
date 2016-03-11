var express = require('express');

var router = express.Router({mergeParams: true});

router.route('/create').post(function(req, res) {
    res.set('Content-Type', 'application/json');

    // res.send(productList);
    res.send('User Created');
});

exports.router = router;
