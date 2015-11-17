var express = require('express');
var pg = require('pg');
var uuid = require('node-uuid');

var router = express.Router();

/* GET home page. */
router.post('/:id', function (req, res) {
    var results = '';
    var id = req.params.id;
    var puc1fee = 0;
    var puc2fee = 0;
    // Grab data from http request
    if (req.body.class === 'PUC1')
        puc1fee = req.body.initialfee;
    else
        puc2fee = req.body.initialfee;

    var data = {
        id: id,
        name: req.body.name,
        dob: new Date(req.body.dob).toISOString().substr(0, 10),
        rollnumber: req.body.rollnumber,
        class: req.body.class,
        puc1fee: puc1fee.toString(),
        puc2fee: puc2fee.toString(),
        mobile: req.body.mobile.toString(),
        address: req.body.address,
        sslcschooladdress: req.body.sslcschooladdress,
        sslcpercentage: req.body.sslcpercentage,
        active: req.body.active
    };
    // Get a Postgres client from the connection pool
    pg.connect(global.connectionString, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Insert Data
        client.query("UPDATE student SET id=?, dob=?, name=?, rollnumber=?, class=?, puc1fee=?, puc2fee=?, mobile=?, address=?, active=?, sslcschooladdress=?, sslcpercentage=? WHERE <condition>");
        client.query("INSERT INTO student(id, name, dob, rollnumber, class, puc1fee, puc2fee, mobile, address, sslcschooladdress, sslcpercentage) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", [data.id, data.name, data.dob, data.rollnumber, data.class, data.puc1fee, data.puc2fee, data.mobile, data.address, data.sslcschooladdress, data.sslcpercentage]);
        return res.json(id);
    });
});
module.exports = router;