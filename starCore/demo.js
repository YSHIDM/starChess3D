let marchLogs = {// 行军日志 starsMap

  // "3": {
  //   0: [{
  //     "army": 500,
  //     "startMusterTime": 1,
  //     belong: 0
  //   }, {
  //     "startMusterTime": 2,
  //     "military": 10,
  //     "endTime": 3,
  //     "offset": 0
  //   }],
  //   1: [{
  //     "startMusterTime": 3,
  //     "military": 10,
  //     "offset": 0,
  //     "endTime": 4
  //   }],
  //   2: [{
  //     "army": 500,
  //     "startMusterTime": 5
  //   }]
  // }
};


let secondDown = (time) => Math.ceil(time / 1000) * 1000;// Math.floor(time / 1000) * 1000;
let secondUp = (time) => Math.ceil(time / 1000) * 1000;
let distanceUp = (distance) => Math.ceil(distance);

let startGame = () => {//ok
  // marchLogs[0] = {};
}
let getDistance = (fromStar, toStar) => 2;
/**
 * 
 * @param {*} musterLog { startMusterTime, endTime }
 * @param {number} timeS 时间段开始 timeS<timeE
 * @param {number} timeE 时间段结束
 * @param {number} distance 当前星球到[to]的距离
 */
let getInterval = ({ startMusterTime, endTime }, timeS, timeE, distance) => {
  if (!endTime) {
    endTime = secondDown(new Date().getTime());
  }
  // - distance * 1000：比子节点要提前距离消耗的时间
  let ts = 0;// musterLog.from开始收到兵力时间
  if (timeS) {
    ts = startMusterTime;
  } else {
    ts = Math.max(startMusterTime, timeS - distance * 1000);
  }

  let te = Math.min(endTime, timeE - distance * 1000);// musterLog.from收到兵力结算时间
  return [ts, te];
}
let _armyOffset = (musterLog = {}, timeS = 0, timeE = 0, distance = 0) => {//为什么不是整数
  console.log('timeE-timeS:' + (timeE - timeS));
  // let startTime = 0;// 队首到达时间
  if (timeS) {
    timeS = Math.max(musterLog.startMusterTime, timeS);
  } else {
    timeS = musterLog.startMusterTime;
  }
  if (musterLog.endTime) {
    timeE = Math.min(musterLog.endTime, timeE);// 队尾到达时间
  }

  if (timeS > timeE) {// 队首没有到达
    return [0, 0];
  }
  if (musterLog.army && timeE >= musterLog.startMusterTime && timeS <= musterLog.startMusterTime) {// 队伍到达
    return [musterLog.army, -1];
  } else if (musterLog.army) {
    return [0, 0];
  }
  if (musterLog.military) {// 队列到达 // 处理的不好
    let offset = (timeE - timeS) / 1000 - 1;
    console.log({ offset });
    let army = offset * musterLog.military;
    return [army, offset];
  }
  console.log('catch:' + musterLog);
  console.log((musterLog.army && timeE >= musterLog.startMusterTime && timeS <= musterLog.startMusterTime));
  return [0, 0]
}
let massByTime = (toStar = '', timeS, timeE) => {
  let toCount = 0;
  let marchLog = marchLogs[toStar];
  for (const fromStar in marchLog) {
    let fromCount = 0;
    let _marchLog = marchLog[fromStar].filter((v, i, a) => {
      if (fromStar === 2) {
        console.log(v);
      }
      let distance = getDistance(toStar, fromStar);
      console.log({ fromStar, toStar });
      let [army, offset] = _armyOffset(v, timeS, timeE, distance);// TODO
      if (v.military && army > 0) {
        let [ts, te] = getInterval(v, timeS, timeE, distance);
        fromCount += massByTime(fromStar, ts, te);
      }
      if (offset === 0) {// switch case
        return;//队首没有到达
      } else if (offset === -1) {
        fromCount += army;//
        return;
      } else {
        fromCount += army;
        v.offset += offset;
        let vMaxOffset = (v.endTime - v.startMusterTime) / 1000;
        if (v.endTime && (vMaxOffset <= v.offset)) {
          return;
        } else {
          return v;
        }
      }
    });
    marchLog[fromStar] = _marchLog
    toCount += fromCount;
  }
  return toCount;
}
let stars = {
  0: { army: 0 },
  1: { army: 0 },
  2: { army: 0 },
  3: { army: 0 },
  4: { army: 0 }
}
let _getMusterLogs = (toStar, fromStar) => {//引用 但是可以使用array的方法
  if (!marchLogs[toStar]) {
    marchLogs[toStar] = { [fromStar]: [] };
  }
  if (!marchLogs[toStar][fromStar]) {
    marchLogs[toStar][fromStar] = [];
  }
  return marchLogs[toStar][fromStar];
}
let moveArmy = (fromStar, toStar, army, startMusterTime) => {
  _getMusterLogs(toStar, fromStar).push({ army, startMusterTime });
}
let startMuster = (fromStar, toStar, military) => {
  let army = massByTime(toStar, null, secondDown(new Date().getTime()))//第5秒结算 550
  stars[toStar].army+=army;
  if (stars[toStar].army > 0) {
    console.log('-----------' + fromStar + '---' + toStar + '-----' + stars[toStar].army);
    moveArmy(fromStar, toStar, stars[toStar].army, secondUp(new Date().getTime()));
  }
  _getMusterLogs(toStar, fromStar).push({
    startMusterTime: secondUp(new Date().getTime()),
    military,
    offset: 0
  });
  // marchLogs[fromStar].musterTo = toStar;
}
let endMuster = (fromStar, toStar) => {//[length].endTime=now;musterTo=null
  let musterLogs = _getMusterLogs(toStar, fromStar);
  musterLogs[musterLogs.length - 1]['endTime'] = secondDown(new Date().getTime());
  // marchLogs[fromStar].musterTo = null;
  let army = massByTime(toStar, null, secondDown(new Date().getTime()))//第5秒结算 550
  stars[toStar].army = army;
}
let emulate = () => {
  startGame();

  moveArmy(0, 1, 500, secondUp(new Date().getTime()));
  startMuster(0, 1, 10);//50
  startMuster(1, 2, 10);//80
  //-----------------------------------------------
  // startMuster(2, 4, 10);//100-3*2000/1000
  // startMuster(3, 4, 10);//100
  //-----------------------------------------------
  // setTimeout(() => {
  //   endMuster(1, 2);//80
  // }, 4000);
  // setTimeout(() => {
  //   startMuster(1, 2, 10);//80
  // }, 5000);
  setTimeout(() => {
    startMuster(2, 4, 10);//100-3*2000/1000
  }, 8000);
  // startMuster(3, 4, 10);//100
  // setTimeout(() => {// 第5秒结束
  //   endMuster(0, 1);//50+500
  // }, 5000);
  // setTimeout(() => {
  //   endMuster(1, 2);//80
  // }, 8000);
  //---------------------------------------------
  setTimeout(() => {
    console.log(JSON.stringify(marchLogs));
    let army = massByTime(4, null, secondDown(new Date().getTime()))
    console.log(JSON.stringify(marchLogs));
    console.log('result:' + army);
  }, 10000);
}

emulate();
// 0-1-2-4  d=6 740
// 0-4      d=6 500+40
// 1-4      d=4 60
// 2-4      d=2 80
// 3-4      d=2 80

// 开始时间向上取整，结束时间向下取整,距离向上取整
// Math.ceil();//up
// Math.floor();//down
// console.log(secondDown());