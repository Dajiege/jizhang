var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  var username = req.body.user;
  var password = req.body.pwd;
  if(username == "1" && password == "1"){
    req.session.user = "管理员";
    res.sendStatus(200);
  } else {
    console.log("登录失败，用户名密码错误");
    res.sendStatus(501);
  }
});

router.get('/logout',function(req,res){
  req.session.user = null;
  req.session.error = null;
  res.redirect("/");
});
module.exports = router;
