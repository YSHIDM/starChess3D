// 星图
// const starsMap = require('./星图.json');
let starNum = 100;

/**
 * 获取星际间军队集结日志
 * @param {string} fromStar 出发星球
 * @param {string} toStar 目标星球
 * @returns {object[]} musterLogs
 */
let _getMusterLogs = (fromStar, toStar) => {//引用 但是可以使用array的方法
  return starsMap[fromStar].relation[toStar].musterLogs;
}
/**
 * 调动军队时间戳
 * @param {string} fromStar 出发星球
 * @param {string} toStar 目标星球
 * @param {number} army 军队数量
 */
let moveArmy = (fromStar, toStar, army, date) => {
  _getMusterLogs(fromStar, toStar).push({ army, date });
}
/**
 * 获取已经集结的兵力
 * @param {object} musterLog 星际间军队集结日志
 * @param {number} distance 星际距离
 * @returns {number[]} [army,offset] army:兵力;offset:0:队首没有到达;-1:全员到达;其他:新的offset
 */
let _armyOffset = (musterLog, distance) => {//撤军计算：结算Buffer，时间调个
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
let massByTime = (fromStar, toStar, distance) => {
  let armyCount = 0
  _getMusterLogs(fromStar, toStar).some((v, i, a) => {
    let [army, offset] = _armyOffset(v, distance);
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
/**
 * 所有星球-集结军队数量
 * @param {string} toStar 目标星球
 */
let countMassByTime = (toStar) => {
  let starInfo = starsMap[toStar];
  starInfo.musterFrom.forEach(v => {
    army += massByTime(v, toStar, starInfo.distance);
  });
}
/**
 * 开始输送兵力
 *  {
 *    "startMusterTime": 1556384738610,//出发时间
 *    "military": 10,//产量
 *    "endTime": 1556384748610,//结束时间
 *    "offset": 0//偏移（有多少时间产的兵力被取走了）
 *  }
 * @param {string} fromStar 出发星球
 * @param {string} toStar 目标星球
 * @param {number} military 生产力 做乘法
 */
let startMuster = (fromStar, toStar, military) => {
  _getMusterLogs(fromStar, toStar).push({
    startMusterTime: new Date().getTime(),
    military,
    offset: 0
  });
  starsMap[fromStar].musterTo = toStar;
}
/**
 * 停止输送兵力
 * @param {string} fromStar 出发星球
 * @param {string} toStar 目标星球
 */
let endMuster = (fromStar, toStar) => {//[length].endTime=now;musterTo=null
  let musterLogs = _getMusterLogs(fromStar, toStar);
  musterLogs[musterLogs.length].endTime = new Date().getTime();
  starsMap[fromStar].musterTo = null;
}

//==================================================

/**
 * 生成可视化星图
 *
 * @param {*} starsCoordinate
 * @returns
 */
let visualStarsMap = (starsCoordinate) => {
  starsCoordinate = starsCoordinate ? starsCoordinate : initStarsCoordinate()
  let starsMap = {};
  for (let i = 0; i < starNum; i++) {
    let relation = [];
    let getDistance = _getDistance(starsCoordinate[i]);//获取距离方法
    relation.push({ id: i, coordinate: starsCoordinate[i], distance: 0 });//1-99
    for (let k = i + 1; k < starNum; k++) {//0--1-99//{ "id": 1, "coordinate": [34, 18, 42], "distance": 56.95612346359257 },

      let distance = getDistance(starsCoordinate[k]);
      relation.push({ id: k, coordinate: starsCoordinate[k], distance });//1-99
      if (!starsMap[i]) {
        starsMap[k] = { coordinate: starsCoordinate[k], relation: [] };
      }
      starsMap[k].relation[i] = { id: i, coordinate: starsCoordinate[i], distance };
    }
    if (!starsMap[i]) {
      starsMap[i] = { coordinate: starsCoordinate[i], relation };
    } else {
      starsMap[i].relation = starsMap[i].relation.concat(relation)
    }
  }
  return starsMap;
}
/**
 * 向外输出starsMap
 *
 */
let getStarsMap = () => {
  return null;
}
// 根据移动距离生成邻接矩阵(并不是)
// 形如：{0:[0,1,0],1:[1,0,0],2:[0,0,0]}
let getStarsAdjacency = (starsMap, steps) => {
  let adjacencyForStars = {};
  for (let i = 0; i < starNum; i++) {
    let adjacencyForStar = starsMap[i].relation.map((v, index) => {
      if (i === index) {
        return 0;
      }
      return v.distance < steps + 1 ? 1 : 0
    });
    adjacencyForStars[i] = adjacencyForStar;
  }
  return adjacencyForStars;
}
/**
 * 根据邻接矩阵，将星球分组
 *
 */
let starGroup = () => {

}
//星标，星距，行军日志




module.exports = {
  endMuster
  , startMuster
  , countMassByTime
  , moveArmy
};
let doIt = async () => {
  let starsMap = starsMapUtil.initStarsMap();
  await require('fs').promises.writeFile(__dirname + '/星图2.json', JSON.stringify(starsMap));
  // let adjacencyForStars = starsMapUtil.getStarsAdjacency(require('./星图.json'), 50);
  // await require('fs').promises.writeFile(__dirname + '/adjacencyForStars.json', JSON.stringify(adjacencyForStars));
}

doIt()
