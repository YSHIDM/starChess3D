/**
 * 生成可视化星图
 *
 * @param {*} starsCoordinate
 * @returns
 */
let visualStarsMap2 = (starsNumber, starsCoordinate) => {
  starsCoordinate = starsCoordinate ? starsCoordinate : initStarsCoordinate()
  let starsMap = {}
  for (let i = 0; i < starsNumber; i++) {
    let relation = []
    let getDistance = _getDistance(starsCoordinate[i])//获取距离方法
    relation.push({ id: i, coordinate: starsCoordinate[i], distance: 0 })//1-99
    for (let k = i + 1; k < starsNumber; k++) {//0--1-99//{ "id": 1, "coordinate": [34, 18, 42], "distance": 56.95612346359257 },

      let distance = getDistance(starsCoordinate[k])
      relation.push({ id: k, coordinate: starsCoordinate[k], distance })//1-99
      if (!starsMap[i]) {
        starsMap[k] = { coordinate: starsCoordinate[k], relation: [] }
      }
      starsMap[k].relation[i] = { id: i, coordinate: starsCoordinate[i], distance }
    }
    if (!starsMap[i]) {
      starsMap[i] = { coordinate: starsCoordinate[i], relation }
    } else {
      starsMap[i].relation = starsMap[i].relation.concat(relation)
    }
  }
  return starsMap
}

let doIt = async () => {
  let starsMap = starsMapUtil.initStarsMap();
  await require('fs').promises.writeFile(__dirname + '/星图2.json', JSON.stringify(starsMap));
  // let adjacencyForStars = starsMapUtil.getStarsAdjacency(require('./星图.json'), 50);
  // await require('fs').promises.writeFile(__dirname + '/adjacencyForStars.json', JSON.stringify(adjacencyForStars));
}

doIt()

function t1() {

  marchMap.set(0, 500)//时间/兵力
  marchMap.set('startMusterTime', 1)
  marchMap.set('military', 10)

  fromMap.set(0, marchMap)
    .set(
      1, new Map()
        .set(1, 10)
        .set(2, 10)
        .set(3, 10)
        .set(4, 10)
    )
    .set(
      1, new Map()
        .set(1, 10)
        .set(2, 10)
        .set(3, 10)
        .set(4, 10)
    )

  toMap.set(3, fromMap)
  toMap.set(1, new Map().set(
    2, new Map()
      .set(0, 20)
      .set(1, 10)
      .set(3, 10)
      .set(4, 10)
  ))

  // _getMarchMap(3, 0).set(1, 10)
  // _getMarchMap(3, 0).set(2, 10)
  // _getMarchMap(3, 0).set(3, 10)
  // _getMarchMap(3, 0).set(4, 10)
  // _getMarchMap(3, 0).set(5, 10)

  console.log(toMap);

}
t1()

endMuster(3, 0)
console.log(toMap);
let a = massByTime(3, 0, 10)
console.log(a);
console.log(toMap);
require('fs').promises.writeFile(__dirname + '/logs.json', JSON.stringify(starsMap));