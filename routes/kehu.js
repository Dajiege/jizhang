var express = require('express');
var multiparty = require('multiparty');
var pub = require('../method/pub');
var mongodb = require('../db/mongodb.js')
var router = express.Router();
var isEmptyObject = pub.isEmptyObject;

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.user){
    req.session.error = "请先登录";
    res.redirect("/");
  } else {
    // if(!isEmptyObject(req.query)){
    //   var id = req.query.kehu_id;
    //   var name = req.query.kehu_name;
    //   var kehuData = {
    //     kehu_id : id,
    //     kehu_name: name
    //   }
    //   mongodb.insertData(kehuData, "kehu");
    // }
    res.render('kehu', { user: req.session.user });

  }
});

router.post('/', function(req, res, next){
  // var form =  new multiparty.Form();
  // form.parse(req, function(err, fields, files){
  //   if(err){
  //     console.log(err);
  //   }
  //   console.log(fields);
  // })
  console.log(req.body);
  res.json(req.body);
})


module.exports = router;
