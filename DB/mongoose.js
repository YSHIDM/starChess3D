const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/starChess';

/**
 * 连接
 */
mongoose.connect(DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true
});

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

const Schema = mongoose.Schema;
/**
let UserSchema = new Schema({
  userName: { type: String },                    //用户账号
  userPwd: { type: String },                        //密码
  userAge: { type: Number },                        //年龄
  loginDate: { type: Date },
  comments: [],                     //最近登录时间
});
let User = mongoose.model('User', UserSchema);

let CommandsSchema = new Schema({
  gameId: String,             // 游戏Id 
  playerId: String,           // 玩家id
  resources: Number,          // 玩家总资源
  level: Number,              // 玩家技能等级
  steps: Number,              // 军队输出距离
  ownTechnologies: Number,    // 玩家拥有科技
  directions: {}              // 玩家对不同星球的命令
});
let Commands = mongoose.model('Commands', CommandsSchema);
*/
let StarsSchema = new Schema({
  id: String,                 // 星球id
  coordinate: [Number],       // 星球坐标
  belong: String,             // 归属玩家id
  ownDysonBall: Boolean,      // 是否拥有戴森球

  startMusterTime: Number,    // 开始集结的时间
  military: Number,           // 军队生产力
  startMilitaryTime: Number,  // 军队结算时间
  armies: {},                 // 星球附近驻扎的军队playerId: army
  musterTo: String,           // 兵力集结指向星球

  defence: Number,            // 防御力
  defenceLevel: Number,       // 防御力等级

  production: Number,         // 生产力
  productionLevel: Number,    // 生产力等级
  productSettle: Number,      // 资源统计时间戳
  resources: Number           // 星球拥有资源
});
let GameSchema = new Schema({
  gameId: String,             // 游戏Id 
  gameState: String,          // 0:等待加入;1:正在游戏;2:暂停游戏（先不考虑）
});
let PlayerSchema = new Schema({
  playerId: String,           // 玩家id
  gameId: String,             // 游戏Id 
  resources: Number,          // 玩家总资源
  level: Number,              // 玩家技能等级
  steps: Number,              // 军队输出距离
  ownTechnologies: Number,    // 玩家拥有科技
  marchLogs: {}              // 玩家对不同星球的命令
});
MarchLogsSchema.index({ playerId: 1})

let Stars = mongoose.model('Stars', StarsSchema);
let Games = mongoose.model('Games', GameSchema);
let Player = mongoose.model('MarchLogs', PlayerSchema);

let marchLogs;

// MarchLogs.insertMany([marchLogs]);
MarchLogs
  .updateOne({ "playerId": 2, "starId": 90 },
    {
      $set: {"directions": {
        "starId": 90,
        "musterFrom": {
          "3": [
            1
          ],
          "4": [
            1
          ],
          "5": [
            2
          ]
        },
        "musterTo": "91"
      }
    }
  })
  .exec()
  .then(out => console.log(out));

// module.exports = { Players, MarchLogs };
