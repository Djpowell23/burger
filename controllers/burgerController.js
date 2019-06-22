var express = require("express");

var router = express.Router();

var burger = require('../models/burger.js');

// All Routing
router.get("/", function (req, res) {
    burger.all(function (data) {
        console.log('data:', data);
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Post Request
router.post("/api/burgers", function (req, res) {
    burger.create([
        "burger_name", "devoured"
    ], [
            req.body.name, req.body.devoured
        ], function (result) {
            // Send back the ID of the new quote
            res.json({ id: result.insertId });
        });
});

// Put Request
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Delete Request
router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;