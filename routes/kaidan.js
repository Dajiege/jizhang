var express = require('express');
var router = express.Router();
var mongoutil = require("../seriver/mongoutil");


router.get('/add',function(req,res,next){
  var no,id,data,select;
  if(req.query.id){
    mongoutil.selectData({"_id":"kaidan"},"ids",select,function(result){
      if(result.length == 0){
        var data_ = {"_id":"kaidan","id":0};
        mongoutil.insertData(data_,"ids");
        id = 1;
        res.render('add_info',{"no":id});
      }
      else if(result[0].id < req.query.id ){
        id = result[0].id + 1;
        res.render('add_info',{"no":id});
      }
      else{
        res.render('add_info',{"no":req.query.id});
      }
    });
  }
  else{
    mongoutil.selectData({"_id":"kaidan"},"ids",select,function(result){
      if(result.length == 0){
        var data_ = {"_id":"kaidan","id":0};
        mongoutil.insertData(data_,"ids");
        id = 1;
        res.render('add_info',{"no":id});
      }
      else{
        id = result[0].id + 1;
        res.render('add_info',{"no":id});
      }
    });
  }

});

router.post('/addname',function(req,res,next){
  var title = req.body.title,
      date = req.body.date,
      id = req.body.id;
      mongoutil.addIds("kaidan","ids",function(result){
        data = {'id': id, 'title': title, 'date':date};
        mongoutil.insertData(data,"kaidan");
        res.sendStatus(200);
      });
});

router.post('/addmufang',function(req,res,next){
  var type = req.body.type,
      changdu = req.body.changdu,
      guige = req.body.guige,
      num = req.body.num,
      fangshu = req.body.fangshu,
      price = req.body.price,
      totalPrice = req.body.totalPrice,
      id = req.body.id,
      data = {item:{'type': type,'changdu': changdu,'guige': guige, 'num': num, 'fangshu': fangshu, 'price': price, 'totalPrice': totalPrice}};
      mongoutil.pushData(data,{"id":id},"kaidan",function(result){
        //console.log(result);
      });
      res.sendStatus(200);
});

router.post('/addmutiao',function(req,res,next){
  var type = req.body.type,
      changdu = req.body.changdu,
      kunshu = req.body.kunshu,
      genshu = req.body.genshu,
      fangshu = req.body.fangshu,
      price = req.body.price,
      totalPrice = req.body.totalPrice,
      id = req.body.id,
      data = {item:{'type': type,'changdu': changdu,'kunshu': kunshu, 'genshu': genshu, 'fangshu': fangshu, 'price': price, 'totalPrice': totalPrice}};
      mongoutil.pushData(data,{"id":id},"kaidan",function(result){
        //console.log(result);
      });
      res.sendStatus(200);
});

router.post('/addjumo',function(req,res,next){
  var type = req.body.type,
      changdu = req.body.changdu,
      kuandu = req.body.kuandu,
      gaodu = req.body.gaodu,
      fangshu = req.body.fangshu,
      price = req.body.price,
      totalPrice = req.body.totalPrice,
      id = req.body.id,
      data = {item:{'type': type,'changdu': changdu,'kuandu': kuandu, 'gaodu': gaodu, 'fangshu': fangshu, 'price': price, 'totalPrice': totalPrice}};
      mongoutil.pushData(data,{"id":id},"kaidan",function(result){
        //console.log(result);
      });
      res.sendStatus(200);
});

router.post('/addother',function(req,res,next){
  var type = req.body.type,
      num = req.body.num,
      danwei = req.body.danwei,
      price = req.body.price,
      totalPrice = req.body.totalPrice,
      id = req.body.id,
      data = {item:{'type': type,'num': num,'danwei': danwei, 'price': price, 'totalPrice': totalPrice}};
      mongoutil.pushData(data,{"id":id},"kaidan",function(result){
        //console.log(result);
      });
      res.sendStatus(200);
});

router.get('/show',function(req,res){
  if(req.query.id){
    mongoutil.selectData({"id": req.query.id},"kaidan",{},function(result){
      if(result.length){
        var id = result[0].id,
        title = result[0].title,
        time = new Date(result[0].date),
        canshu = result[0].item,
        data = {"id": id, "title": title, "year":time.getFullYear(), "month": time.getMonth()+1, "date": time.getDate(), "canshu": canshu}
        res.render('tablelist',{"data":data});
      }
      else{
        var data={};
        res.render('tablelist',{"data":data});
      }
  });
  }
  else{
    var data={};
    res.render('tablelist',{"data":data});
  }
  
});

module.exports = router;