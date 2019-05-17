let marchLogs = {// 行军日志 starsMap
  "3": {
    0:[{
      "army": 500,
      "startMusterTime": 1,
      belong:0
    }, {
      "startMusterTime": 2,
      "military": 10,
      "endTime": 3,
      "offset": 0
    }],
     1:[{
      "startMusterTime": 3,
      "military": 10,
      "offset": 0,
      "endTime": 4
    }],
    2:[{
      "army": 500,
      "startMusterTime": 5
    }]
  }
};
let commandLogs = [{// 命令日志：ls 0/time
  starId: 0,
  dictate: 'ls 0',
  time: 1556384748610
},{// 命令日志
  from:0,
  to:1,
  army:100,
  time:1556384748610
},{// 命令日志
  from:0,
  to:1,
  military: 10,
  time:1556384748610,
},{// 命令日志：2 Muster 4 10 startDate endDate/time 
  from:2,
  to:4,
  military: 10,
  time:1556384748610,
  endTime:1556384748610
},{// 命令日志 attack 0 /time
  starId: 0,
  dictate: '',//作战
  time: 1556384748610
}];
let game_player = {// 游戏开始时insert
  gameId: 1,
  playerId: 1,
  resources:0,
  level:0,
  steps:0,
  ownTechnologies:0,
  marchLogs:{}
};
let marchLog = marchLogs['3'];
let v = Object.values(marchLog)
console.log(v);//遍历并 concat

//兵力结算
//[集结]派兵前结算，
//修改集结不需要结算兵力
//在初次集结派兵或停止集结一段时间后再次派兵时使用

//a->b->c->d:(time>now+[d-c])+(time>now+[d-c]+[c-b])+...