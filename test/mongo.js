// mongoose 链接
var mongoose = require("mongoose");
var db = mongoose.createConnection("mongodb://127.0.0.1:27017/test");
// 链接错误
db.on("error", function (error) {
  console.log(error);
});
// Schema 结构
var mongooseSchema = new mongoose.Schema({
  id: { type: Number },
  relation: { type: Array }
});
// // 添加 mongoose 实例方法
// mongooseSchema.methods.findbyusername = function(username, callback) {
//   return this.model("mongoose").find({ username: username }, callback);
// };
// // 添加 mongoose 静态方法，静态方法在Model层就能使用
// mongooseSchema.statics.findbytitle = function(title, callback) {
//   return this.model("mongoose").find({ title: title }, callback);
// };
// model
// var MongooseModel = db.model("t", mongooseSchema);
// 增加记录 基于 entity 操作
var doc = {
  "id": 1,
  "relation": [
    [
      {
        "army": 9.0,
        "startMusterTime": 1556384738610,
      },
      {
        "startMusterTime": 1556384738610,
        "military": 10,
        "offset": 0,
        "endTime": 2.0
      }
    ]
  ]
};
var doc2 = {
  "id": 2,
  "relation": [
    [
      {
        "army": 9.0,
        "time": 1556384738610,
        "endTime": 1556384738610.0
      },
      {
        "startMusterTime": 1556384738610,
        "military": 10,
        "offset": 0,
        "endTime": 2.0
      }
    ]
  ]
};
// var mongooseEntity = new MongooseModel(doc);
// mongooseEntity.save(function (error) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("saved OK!");
//   }
//   // 关闭数据库链接
//   db.close();
// });
// MongooseModel.insertMany([doc,doc2]);
// db.t.update({"id":1},{$set:{"relation.0.1.endTime":2}});
// MongooseModel.update({id:1},{$set:{"relation[0][1]endTime":6}});

// MongooseModel.update({relation:{$all:[doc.relation]},relation:doc.relation},{$set:{"relation.$":1}},function(err){
//   if(err) return console.log(err);
//   console.log('文章更新成功');
// })
// MongooseModel.update({ id:1,relation: { $all: [doc.relation[0]] } }, { $set: { "relation.0.1.endTime": 6 } }, function (err) {
//   if (err) return console.log(err);
//   console.log('文章更新成功');
// })
// // 增加记录 基于model操作
// var doc = {
//   username: "model_demo_username",
//   title: "model_demo_title",
//   content: "model_demo_content"
// };
// mongooseModel.create(doc, function(error) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("save ok");
//   }
//   // 关闭数据库链接
//   db.close();
// });
// // 修改记录
// mongooseModel.update(conditions, update, options, callback);
// var conditions = { username: "model_demo_username" };
// var update = { $set: { age: 27, title: "model_demo_title_update" } };
// var options = { upsert: true };
// mongooseModel.update(conditions, update, options, function(error) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("update ok!");
//   }
//   //关闭数据库链接
//   db.close();
// });
// // 查询
// // 基于实例方法的查询
// var mongooseEntity = new mongooseModel({});
// mongooseEntity.findbyusername("model_demo_username", function(error, result) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(result);
//   }
//   //关闭数据库链接
//   db.close();
// });
// // 基于静态方法的查询
// mongooseModel.findbytitle("emtity_demo_title", function(error, result) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(result);
//   }
//   //关闭数据库链接
//   db.close();
// });
// // mongoose find
// var criteria = { title: "emtity_demo_title" }; // 查询条件
// var fields = { title: 1, content: 1, time: 1 }; // 待返回的字段
// var options = {};
// mongooseModel.find(criteria, fields, options, function(error, result) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(result);
//   }
//   //关闭数据库链接
//   db.close();
// });
// // 删除记录
// var conditions = { username: "emtity_demo_username" };
// mongooseModel.remove(conditions, function(error) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("delete ok!");
//   }

//   //关闭数据库链接
//   db.close();
// });
