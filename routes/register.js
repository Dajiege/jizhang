var express = require('express');
var router = express.Router();
var mongoutil = require("../seriver/mongoutil");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('register');
// });
router.get('/',function(req,res,next){
  res.render('register');
})
router.post('/',function(req,res){
  var username = req.body.uname,
      password = req.body.upwd,
      data = {"user":username,"password": password};
      data_ = {"user":username};
      select = {};
  mongoutil.selectData(data_,"users",select,function(result){
    var isEmpty = (function(){
      var m;
      for(m in result)
        return false;
      return true
    })();
    if(!isEmpty){
      console.log("已存在该用户名");
      res.sendStatus(501);
    }
    else{
      mongoutil.insertData(data,"users");
      res.sendStatus(200);
    }
  })
  console.log(username);
})
module.exports = router;
