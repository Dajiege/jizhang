var express = require('express');
var router = express();
var mongoutil = require('../seriver/mongoutil');

router.get('/',function(req,res,next){
  var data = {},
      select = {};
  mongoutil.selectData(data,"users",select,function(result){
    res.render('admin',{"user": result});
  })
})

module.exports = router;