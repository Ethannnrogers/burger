var burger = require('../models/burger.js');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/burgers');
});

router.get('/burgers', function(req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/burgers/create', function (req, res) {
	burger.insertOne('burgers', req.body.burger_name, function () {
		res.redirect('/burgers');
	});
});

router.put('/burgers/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;
	burger.updateOne(
        { 
            devoured: req.body.devoured
        }, 
        condition,
        function (result) {
        res.redirect('/burgers');
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
	});
});


module.exports = router;
