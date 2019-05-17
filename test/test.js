var User = require("./user.js");
// var UserSchema = new Schema({
//   username: { type: String },                    //用户账号
//   userpwd: { type: String },                        //密码
//   userage: { type: Number },                        //年龄
//   logindate: { type: Date },
//   comments: [],                     //最近登录时间
// });
// let User = mongoose.model('User', UserSchema);
/**
 * 插入
 */
function insert() {

  // var user = new User({
  //   username: 'Tracy McGrady',                 //用户账号
  //   userpwd: 'abcd',                            //密码
  //   userage: 37,                                //年龄
  //   logindate: new Date(),                      //最近登录时间
  //   comments:[[1,2],[3,4]]
  // });

  // user.save(function (err, res) {
  //   if (err) {
  //     console.log("Error:" + err);
  //   }
  //   else {
  //     console.log("Res:" + res);
  //   }
  // });
  // User.update({userage:37},{$push:{'comments':[2,3]}})
  // User.update({userage:37},{$set:{'comments.1':[2,3]}})
  // User.update({userage:37},{$set:{'comments[1]':[2,3]}})
  // User.update({userage:37},{$set:{"userage":24}});
  // User.findOneAndUpdate({ userage: 24 }, { $pull: { 'comments.0': 249 } }
  // , function (err,doc,res) {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log('u');
  //   }
  // })
  User.findOneAndUpdate({ userage: 24 }, { $push: { 'comments.0': 249 } }).exec();
  // console.log(a);
}

insert();