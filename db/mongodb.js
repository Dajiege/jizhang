var MongoClient = require('mongodb').MongoClient;
var config = require('../config/config');
var DB_CONN_STR = config.MONGODB_STR;

var insertData = function(data, coll, db, callback) {
  var collection = db.collection(coll);
  collection.insert(data, function(err, result){
      if(err){
        console.log('Error:'+ err);
        return;
      }
      callback(result);
  })
}

module.exports = {
  insertData: function(data, coll, callback){
    MongoClient.connect(DB_CONN_STR, function(err, database){
      const zzdb = database.db("zzdb");
      insertData(data, coll, zzdb, function(result){
        if(callback){
          callback(result);
        }
        database.close();
      })
    })
  }
}