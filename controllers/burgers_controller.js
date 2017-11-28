var express = require("express");
var db = require("../models");


var router = express.Router();

router.get("/", function(req, res) {
    db.Burgers.findAll({}).then(function(result) {
        var hbsObject = { burgers: [] };
        for (var i = 0; i < result.length; i++) {
            hbsObject.burgers.push(result[i].dataValues);
        }
        res.render("index", hbsObject);
    });
});


router.post("/api/burgers", function(req, res) {
    db.Burgers.create({
        burger_name: req.body.burger_name
    }).then(function(result) {
        res.json(result);
    });
});


router.put("/api/burgers/:id", function(req, res) {
    db.Burgers.update({
        devoured: true
    }, {
        where: {
            id: req.params.id
        }
    }).then(function(result) {
        res.json(result);
    });
});


module.exports = router;