var express = require('express');
var router = express.Router();
var mongoutil = require("../seriver/mongoutil");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '登录' });
});

router.post('/', function(req,res,next){
  var username = req.body.user,
      password = req.body.pwd,
      data = {"user":username,"password": password},
      select = {};
  mongoutil.selectData(data,"users",select,function(result){
    var isEmpty = (function(){
      var m;
      for(m in result)
        return false;
      return true
    })();
    if(isEmpty){
      console.log("登录失败，用户名密码错误");
      res.sendStatus(501);
    }
    else{
      req.session.user = username;
      console.log("登录成功");
      res.sendStatus(200);
    }
  })
})

router.get('/success',function(req,res){
  if(!req.session.user){
    req.session.error = "请先登录";
    res.redirect("/");
  }
  res.render('success', { user: req.session.user});
})

router.get('/logout',function(req,res){
  req.session.user = null;
  req.session.error = null;
  res.redirect("/");
})
module.exports = router;
