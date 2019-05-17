let Schema = require('./moose.js').Schema;

var UserSchema = new Schema({
  userName: { type: String },                    //用户账号
  userPwd: { type: String },                        //密码
  userAge: { type: Number },                        //年龄
  loginDate: { type: Date },
  comments: [],                     //最近登录时间
});
let User = mongoose.model('User', UserSchema);

module.exports = User;