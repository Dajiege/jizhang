var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.session.user){
    req.session.error = "请先登录";
    res.redirect("/");
  }
  res.render('imex', { user: req.session.user });
});


module.exports = router;
