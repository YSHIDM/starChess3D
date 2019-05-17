let marchLogs2 = {// 行军日志 starsMap

  "3": {
    0: [{
      "army": 500,
      "startMusterTime": 1,
    }, {
      "startMusterTime": 2,
      "military": 10,
      "offset": 0
    }],
    1: [{
      "startMusterTime": 3,
      "military": 10,
      "offset": 0,
      "endTime": 4
    }],
    2: [{
      "army": 500,
      "startMusterTime": 5
    }]
  }
};
let a = {
  "startMusterTime": 2,
  "military": 10,
  "endTime": 3,
  "offset": 0
};
let b = {
  "startMusterTime": 2,
  "military": 10,
  "offset": 0
};
let secondUp = () => Math.ceil(new Date().getTime() / 1000) * 1000;
function militaryToArmy() {
  let arr = marchLogs2['3']['0']
  let a = arr.pop()
  
  let armyList = fn2(a);
  arr = [...arr,...armyList]
  marchLogs2['3']['0'] = arr
}
function _militaryToArmy(a) {
  if(!a.endTime){
    a.endTime = secondUp()
    a.startMusterTime = a.endTime - 5000;
  }
  let armyList = []
  let l = (a.endTime - a.startMusterTime)/1000;
  for (let i = 0; i < l; i++) {
    armyList.push({startMusterTime:a.startMusterTime+i*1000,army:a.military})
  }
  return armyList;
}