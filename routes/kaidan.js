var express = require('express');
var router = express.Router();
var mongoutil = require("../seriver/mongoutil");

router.get('/',function(req,res,next){
  res.render('jizhang');
});

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
  var name = req.body.name,
      zhonglei = req.body.zhonglei,
      date = req.body.date,
      id = req.body.id;
      mongoutil.addIds("kaidan","ids",function(result){
        var data = {'id': id, 'name': name, 'zhonglei': zhonglei, 'date':date};
        mongoutil.insertData(data,"kaidan");
        res.sendStatus(200);
      });
});
router.post('/editname',function(req,res,next){
  var name = req.body.name,
      zhonglei = req.body.zhonglei,
      date = req.body.date,
      id = req.body.id,
      data = {'name': name, 'zhonglei':zhonglei, 'date':date};
      mongoutil.updateData(data,{"id": id},"kaidan");
      res.sendStatus(200);
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

router.get('/show',function(req,res,next){
  if(req.query.id){
    mongoutil.selectData({"id": req.query.id},"kaidan",{},function(result){
      if(result.length){
        var id = result[0].id,
        name = result[0].name,
        zhonglei = result[0].zhonglei,
        time = new Date(result[0].date),
        canshu = result[0].item,
        data = {"id": id, "name": name, "zhonglei": zhonglei, "year":time.getFullYear(), "month": time.getMonth()+1, "date": time.getDate(), "canshu": canshu}
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

router.get('/list',function(req,res,next){
  mongoutil.selectData({},"kaidan",{},function(result){
    var totalPrice,time,item,data = [];
    for(var i = 0 ,len = result.length; i < len ; i++){
      item = {}
      totalPrice = 0;
      time = new Date(result[i].date);
      for(var t = 0, len2 = result[i].item.length; t < len2; t++){
        totalPrice += parseFloat(result[i].item[t].totalPrice);
      }
      item = {"id": result[i].id, "name": result[i].name, "totalPrice": totalPrice, "year": time.getFullYear(),"month": time.getMonth()+1, "date": time.getDate()};
      data.push(item);
    }
    res.render('list_info',{data : data});
  })
  
});
router.get('/edit',function(req,res,next){
  var id,name,zhonglei,data,select;
  if(req.query.id){
    mongoutil.selectData({"id":req.query.id},"kaidan",{},function(result){
      if(result.length == 0){
        req.session.error = "没有该订单";
        res.redirect("/");
      }
      else{
        data = {"id": result[0].id, "name": result[0].name,"zhonglei":result[0].zhonglei}
        res.render('edit',{"data":data});
      }
    });
  }
  else{
        req.session.error = "缺少参数";
        res.redirect("/");
  }
});

router.get('/edit_form',function(req,res,next){
  if(req.query.id){
    mongoutil.selectData({"id": req.query.id},"kaidan",{},function(result){
      if(result.length){
        var id = result[0].id,
        name = result[0].name,
        zhonglei = result[0].zhonglei,
        time = new Date(result[0].date),
        canshu = result[0].item,
        data = {"id": id, "name": name, "zhonglei": zhonglei, "year":time.getFullYear(), "month": time.getMonth()+1, "date": time.getDate(), "canshu": canshu}
        res.render('edit_info',{"data":data});
      }
      else{
        var data={};
        res.render('edit_info',{"data":data});
      }
  });
  }
  else{
    var data={};
    res.render('edit_info',{"data":data});
  }
});

router.post('/del',function(req,res,next){
  var index = req.body.index,
      id = req.body.id;
      mongoutil.pullData("item",index,{"id":id},"kaidan",function(result){
        // console.log("item."+index);
        //console.log(result);
      });
      res.sendStatus(200);
});
module.exports = router;