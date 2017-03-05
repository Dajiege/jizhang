var MongoClient = require('mongodb').MongoClient;
var config = require("../config/config");
var DB_CONN_STR = config.MONGODB_STR;
var insertData = function(data, conllection, db, callback){
  var collection = db.collection(conllection);
  collection.insert(data, function(err,result){
    if(err){
      console.log('Error:'+ err);
      return;
    }
    callback(result);
  });
};
var selectData = function(where,conllection,select,db,callback){
  var collection = db.collection(conllection);
  collection.find(where,select).toArray(function(err,result){
    console.log(result);
    if(err){
      console.log('Error:'+ err);
      return;
    }
    callback(result);
  });
};
var removeData = function(data,conllection,db,callback){
  var collection = db.collection(conllection);
  collection.remove(data,function(err,result){
    console.log(result);
    if(err){
      console.log('Error:'+ err);
      return;
    }
    callback(result);
  });
};
module.exports ={
  insertData:function(data,conllection,cb){
    MongoClient.connect(DB_CONN_STR, function(err,db){
      console.log("连接成功!");
      insertData(data,conllection,db,function(result){
        if(cb){
          cb(result);
        }
        db.close();
      });
    });
  },
  selectData:function(where,conllection,select,cb){
    MongoClient.connect(DB_CONN_STR,function(err,db){
      console.log("连接成功!");
      selectData(where,conllection,select,db,function(result){
        if(cb){
          cb(result);
        }
        db.close();
      })
    })
  },
  removeData:function(data,conllection,cb){
    MongoClient.connect(DB_CONN_STR, function(err,db){
      console.log("连接成功!");
      removeData(data,conllection,db,function(result){
        if(cb){
          cb(result);
        }
        db.close();
      });
    });
  }
}