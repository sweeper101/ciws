//models/calorie.model.js
const express = require("express");

const formRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../DbConnect");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a single workorder by id
formRoutes.route("/form/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("forms")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
  });

  // This section will help you create a new form.
  formRoutes.route("/form/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
    };
    db_connect.collection("forms").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

  // This section will help you update a record by id.
  formRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {
      $set: {
      },
    };
    db_connect
      .collection("forms")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
      });
  });

module.exports = formRoutes;