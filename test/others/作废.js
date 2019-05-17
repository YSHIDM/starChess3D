let massByTime3 = (toStar = '', timeS, timeE) => {
  let toCount = 0;
  starsMap[toStar].some((v) => {
    let distance = getDistance(toStar, v.from);
    let [army, offset] = _armyOffset(v, timeS, timeE, distance);
    if (musterLog.military && army > 0) {
      let [ts, te] = getInterval(v, timeS, timeE, distance);
      toCount += massByTime(v.from, ts, te);
    }
    if (offset === 0) {
      return true;//队首没有到达
    } else if (offset === -1) {
      toCount += army;
    } else {
      toCount += army;
      if (v.endTime && offset >= v.endTime - v.startMusterTime) {
        a.shift();
      }
      v.offset = offset;
      a[i] = v;
      return true;//时间超出，不再继续循环
    }
    if (musterLog.military && army > 0) {
      let [ts, te] = getInterval(v, timeS, timeE, distance);
      massByTime(v.from, ts, te);
    }
  })
  return toCount;
}

/**
 * 获取已经集结的兵力
 * @param {object} musterLog 星际间军队集结日志
 * @param {number} distance 星际距离
 * @returns {number[]} [army,offset] army:兵力;offset:0:队首没有到达;-1:全员到达;其他:新的offset
 */
let _armyOffset2 = (musterLog, distance) => {//撤军计算：结算Buffer，时间调个
  let now = new Date().getTime();
  let startTime = musterLog.startMusterTime + distance * 1000;// 队首到达时间
  let endTime;
  if (musterLog.endTime) {
    endTime = musterLog.endTime + distance * 1000;// 队尾到达时间
  }

  if (startTime > now) {// 队首没有到达
    return [0, 0]
  }
  if (musterLog.army) {// 队伍到达
    return [musterLog.army, -1];
  }
  if (musterLog.military) {// 队列到达
    if (endTime && now > endTime) {
      return [((endTime - startTime) / 1000 - musterLog.offset) * musterLog.military, -1];
    } else {
      let offset = (startTime - now) / 1000 - musterLog.offset;
      return [offset * musterLog.military, offset + musterLog.offset]
    }
  }
}
/**
 * 星球间集结军队数量
 * @param {string} fromStar 出发星球
 * @param {string} toStar 目标星球
 * @param {number} distance 星际距离
 */
let massByTime2 = (fromStar, toStar, distance) => {
  let armyCount = 0
  _getMusterLogs(fromStar, toStar).some((v, i, a) => {
    let [army, offset] = _armyOffset2(v, distance);
    if (offset === 0) {
      return true;
    } else if (offset === -1) {
      armyCount += army;
      a.shift();
    } else {
      v.offset = offset;
      a[i] = v;
      return true;
    }
  });
  return armyCount;
}
let _armyOffset2 = (musterLog = {}, timeS = 0, timeE = 0, distance = 0) => {
  let startTime = 0;// 队首到达时间
  if (timeS) {
    startTime = Math.max(musterLog.startMusterTime + distance * 1000, timeS);
  } else {
    startTime = musterLog.startMusterTime + distance * 1000;
  }
  let endTime = 0;
  if (musterLog.endTime) {
    endTime = Math.min(musterLog.endTime + distance * 1000, timeE);// 队尾到达时间
  } else {
    endTime = timeE;
  }
  if (startTime > timeE) {// 队首没有到达
    return [0, 0]
  }
  if (musterLog.army) {// 队伍到达
    return [musterLog.army, -1];
  }
  if (musterLog.military) {// 队列到达
    let _offset = (endTime - startTime) / 1000 - musterLog.offset;
    let army = _offset * musterLog.military;
    let offset = _offset + musterLog.offset
    return [army, offset];
  }
}

/**
 * 
 * @param {*} musterLog { startMusterTime, endTime }
 * @param {number} timeS 时间段开始 timeS<timeE
 * @param {number} timeE 时间段结束
 * @param {number} distance 当前星球到[to]的距离
 */
let getInterval = ({ startMusterTime, endTime }, timeS, timeE, distance) => {
  if (!endTime) {
    endTime = new Date().getTime();
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