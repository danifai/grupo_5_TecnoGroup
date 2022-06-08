const { Router } = require("express");
var express = require ("express");

var router = express.Router ();

/*Get home page */
router.get ("/", function  (req, res, next){
  res.render ("index", {title: "express"})
  
});

router.get ("/monstrarNumeroSession", function  (req, res, next){
  res.send ("Session tiene el numero: " + req.session.numeroVisitas)
  
});

module.exports = router;