var express = require('express');
var router = express.Router();
var mongoutil = require("../seriver/mongoutil");


router.get('/add',function(req,res,next){
  var no,id,data,select;
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
  })

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

router.post('/add',function(req,res,next){
  var changdu = req.body.changdu,
      guige = req.body.guige,
      num = req.body.num,
      fangshu = req.body.fangshu,
      price = req.body.price,
      totalPrice = req.body.totalPrice,
      id = req.body.id,
      data = {item:{'changdu': changdu,'guige': guige, 'num': num, 'fangshu': fangshu, 'price': price, 'totalPrice': totalPrice}};
      console.log(data);
      mongoutil.pushData(data,{"id":id},"kaidan",function(result){
        console.log(result);
      });
      res.sendStatus(200);
});

router.get('/show',function(req,res){
  if(req.query.id){
    mongoutil.selectData({"id": req.query.id},"kaidan",{},function(result){
      if(result.length){
        var id = result[0].id,
        title = result[0].title,
        time = new Date(result[0].date);
        if(result[0].item){
          var canshu = result[0].item;
          data = {"id": id, "title": title, "year":time.getFullYear(), "month": time.getMonth()+1, "date": time.getDate(), "canshu": canshu}
          res.render('tablelist',{"data":data});
        }
        else{
          data = {"id": id, "title": title, "year":time.getFullYear(), "month": time.getMonth()+1, "date": time.getDate()}
          res.render('tablelist',{"data":data});
        }
        
       
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