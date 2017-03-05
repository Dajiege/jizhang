var express = require('express');
var router = express.Router();
var mongoutil = require("../seriver/mongoutil");


router.get('/add',function(req,res){
  res.render('add_info');
})

router.get('/show',function(req,res){
  res.render('tablelist');
})

module.exports = router;