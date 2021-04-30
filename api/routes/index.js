var express = require('express');
var router = express.Router();
router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.get("/apiData/:collection", function(req, res, next) {
  let dbConnection = req.app.locals.db;
  let collection = req.params.collection;

  dbConnection.collection(collection).find().toArray(function(err, data) {
    if(err !== null) {
      console.log(err),
      res.send({mensaje: "Ha habido un error. " + err } );
    } else {
      console.log(data);
      res.send(data);
    } 
  })
});

router.put("/apiData/Best5", function(req, res, next) {
  let dbConnection = req.app.locals.db;
  let newOther5 = req.body.records;

  dbConnection.collection("Best5").updateOne({"playerRecords.name": "other5"}, {$set: {"playerRecords.array": newOther5}}, function(err, data) {
    if(err !== null) {
  console.log(err),
  res.send({mensaje: "Ha habido un error. " + err } );
  } else {
    res.send(data);
  } 
  })
});

module.exports = router;
