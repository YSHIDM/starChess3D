const UUID = require('uuid');
const Star = require('./Star');
const { random, getDistance } = require('./util');
/**
 * 游戏
 * id自增
 *
 * @class Game
 */
class Game {
  constructor(playerNumber) {
    this.playerNumber = playerNumber
    this.id = Game._id++ + '' // 游戏id
    this.state = 0            // 游戏状态，0:等待加入;1:正在游戏;2:暂停游戏（先不考虑）
    this.starsNumber = 100    // 星球数量
    this.spaceSize = 100      // 星空大小（正方体边）
    /**
     * @type {Map<number,Star>} starId,star
     */
    this.starsMap = new Map()    // 全部星球 
    /**
     * 星图/星距
     * @type {Map<string,Map<string,number>>}
     */
    this.starsDistance = new Map()
    /**
     * 行军日志 playerId,toStarId,fromStar,distance
     * @type {Map<string,Map<string,Map<string,Map<string,number>>>>}
     */
    this.toMap = new Map()
    this.gameTime = 0         // 游戏开始时间
    /**
     * 侦察日志，
     * 客户端第一次访问进行记录并返回消耗时间，客户端setTimeout，第二次访问进行比较验证
     * 
     * @type {Map<string,{time:number,toStar:string,toStarCoordinate:number[],distance:number}>}
     * {detectId, {时间,星球1,星球2,距离}}
     */
    this.detectMap = new Map()
  }
  //------------------------------------初始化------------------------------------
  /**
   * 按模式初始化游戏
   * @param {number} mode 游戏模式
   */
  initGameByMode(mode, starsNumber, spaceSize) {
    switch (mode) {
      case 0:
        initGame(starsNumber, spaceSize)
        return;
      default:
        return;
    }
  }
  /**
   * 初始化游戏
   * @param {number} starsNumber 星球数量
   * @param {number} spaceSize 星空大小（正方体边）
   */
  initGame(starsNumber = 10, spaceSize = 30) {
    this.starsNumber = starsNumber
    this.spaceSize = spaceSize
    this.state = 1
    this._initStars()
    //switch case 单人/双人、确定初始星球 等
    this._initStarsMap()
    this.gameTime = Math.ceil(new Date().getTime() / 1000)
  }
  // initPlayer() {
  //   // 玩家位置，拥有星球，兵力，资源等
  // }
  initStar(coordinate = [this.spaceSize, this.spaceSize, this.spaceSize]) {
    let star = new Star(coordinate);
    this.starsMap.set(star.id, star)
  }
  /**
   * 生成群星,初始化this.starsMap
   */
  _initStars() {
    for (let i = 0; i < this.starsNumber - this.playerNumber; i++) {
      let coordinate = [
        random(0, this.spaceSize),
        random(0, this.spaceSize),
        random(0, this.spaceSize)
      ];
      initStar(coordinate)
    }
  }
  /**
   * 初始化this.starsDistance
   */
  _initStarsMap() {
    this.starsMap.forEach((star1, id1) => {
      let getDistance2 = getDistance(star1.coordinate)
      this.starsMap.forEach((star2, id2) => {
        let distance = getDistance2(star2.coordinate)
        this.starsDistance.set(id1, new Map().set(id2, distance))
      })
    })
  }

  //------------------------------------兵力运输------------------------------------
  /**
   * 开始输送兵力
   * @param {string} playerId 玩家id
   * @param {string} fromStar 出发星球
   * @param {string} toStar 目标星球
   * @param {number} startMusterTime 集结开始时间，game.secondUp()
   * @param {number} military 生产力 做乘法
   */
  startMuster(playerId, fromStar, toStar) {
    let star = this.starsMap.get(toStar)
    let now = this.secondUp()
    if (!star.receiveArmyTime) {
      star.receiveArmyTime = now
    }
    this.toMap.get(playerId).get(toStar).get(fromStar)
      .set('startMusterTime', now)
      .set('military', this.starsMap.get(fromStar).military)
  }
  /**
   * 时间段颗粒化
   * @param {Map<string|number,number>} marchMap 行军日志
   */
  _militaryToArmy(marchMap) {
    let l = 10 - marchMap.get('startMusterTime');//test
    for (let i = 0; i < l; i++) {
      marchMap.set(marchMap.get('startMusterTime') + i, marchMap.get('military'))
    }
  }
  /**
   * 停止输送兵力
   * @param {string} playerId 玩家id
   * @param {string} fromStar 出发星球
   * @param {string} toStar 目标星球
   */
  endMuster(playerId, fromStar, toStar) {// TODO 数据是否修改成功
    let marchMap = this.toMap.get(playerId).get(toStar).get(fromStar)
    _militaryToArmy(marchMap)
    marchMap.delete('startMusterTime')
    marchMap.delete('military')
  }
  /**
   * 军队运动结算
   * @param {Map<number|string, number>} marchMap 
   * @param {number|number[]} timeS 时间段开始 或时间数组
   * @param {number} timeE 时间段结束
   * @returns {[number,number[]]}
   */
  _armyOffset(marchMap, timeS, timeE = 0) {
    let countArmy = 0
    let timeArray = []
    if (typeof timeS === 'object') {//array 形式
      timeS.forEach(v => {
        let _army = marchMap.get(v) | 0
        countArmy += _army
        marchMap.delete(v)
        timeArray.push(v)
      })
    } else {
      marchMap.forEach((v, k) => {
        if (k >= timeS && k <= timeE) {
          countArmy += v | 0
          marchMap.delete(k)
          timeArray.push(k)
        }
      })
    }
    return [countArmy, timeArray]
  }
  /**
   * 当前星球集结军队数量
   * @param {string} playerId 玩家id
   * @param {string} toStar 目标星球
   * @param {number|number[]} timeS 当前（toStar）星球开始收到兵力时间,或时间数组
   * @param {number} timeE 当前（toStar）星球兵力结算时间，外部调用是为当前时间点
   */
  receiveSettle(playerId, toStar, timeS, timeE = 0) {
    if (!this.toMap.get(playerId).has(toStar)) {
      return 0
    }
    let toCount = 0
    let fromMap = this.toMap.get(playerId).get(toStar)
    fromMap.forEach((marchMap, fromStar) => {
      let distance = this.getDistanceByStar(fromStar, toStar)

      let _timeS = 0
      let _timeE = 0
      if (!timeE) {//0-false
        _timeS = timeS.map(v => {
          return v -= distance
        })
      } else {//递归顶层
        _timeS = timeS - distance
        _timeE = timeE - distance
      }

      let [army, timeArray] = _armyOffset(marchMap, _timeS, _timeE)

      if (army > 0) {
        toCount += army
        toCount += this.receiveSettle(playerId, fromStar, timeArray)
      }
    })
    return toCount;
  }
  /**
   * 调动军队时间戳
   * @param {string} playerId 玩家id
   * @param {string} fromStar 出发星球
   * @param {string} toStar 目标星球
   * @param {number} army 军队数量
   */
  moveArmy(playerId, fromStar, toStar, army) {
    this.toMap.get(playerId).get(toStar).get(fromStar).set(this.secondUp(), army);
  }



  /**
   * 当前兵力结算
   * @param {string} playerId 玩家id
   * @param {string} toStar 目标星球
   */
  armySettle(playerId, toStar) {// 未完成 outTime, //调用util
    let star = this.starsMap.get(toStar)
    if (star.musterTo) {
      return 'musterTo' + musterTo
    }
    let now = this.secondUp()
    let army = star.militarySettle(now)// 生产兵力
    army += this.receiveSettle(playerId, toStar, star.receiveArmyTime, now);// 接收兵力
    star.startMilitaryTime = now // 军队结算时间
    star.armies[playerId] += army //TODO 是不是修改了
  }
  /**
   * 输出兵力//存入星图
   * @param {string} playerId 玩家id
   * @param {string} fromStar 出发星球
   * @param {string} toStar 目标星球
   * @param {number} army 兵力数量,army 大于总兵力或小于等于零，则赋值为总兵力
   */
  sendArmy(playerId, fromStar, toStar, army = 0) {//TODO
    this.armySettle(playerId, toStar)
    let star = this.starsMap.get(toStar)
    if (army <= 0 || army > star.armies[playerId]) {
      army = this.army;
    }
    star.armies[playerId] -= army
    //调动军队时间戳
    this.moveArmy(fromStar, toStar, this.secondUp(), army);
  }
  /**
   * 向目标星球集结军队//存入星图
   * @param {string} fromStar 出发星球
   * @param {string} toStar 目标星球
   */
  musterArmy(fromStar, toStar) {
    let star = this.starsMap.get(fromStar)
    if (star.musterTo) {
      this.endMuster(fromStar, star.musterTo)
    } else {
      star.sendArmy(toStar)
    }
    star.musterTo = toStar
    this.startMuster(fromStar, toStar, star.military)//TODO
  }


  /**
   * 获取所有拥有的星球
   * @param {string} playerId 玩家id
   * @returns {string[]} starIds
   */
  getAllOwnStar(playerId) {
    let starIds = []
    this.starsMap.forEach(v => {
      if (v.belong === playerId) {
        starIds.push(v.id)
      }
    })
    return starIds
  }

  /**
   * 
   * @param {string} starId 
   * @param {number} steps 
   * @returns {string[]}
   */
  getAbutStar(starId, steps) {
    let abutStars = []
    this.starsDistance.get(starId).forEach((distance, star2) => {
      if (distance < steps) {
        abutStars.push[star2]
      }
    })
    return abutStars
  }


  //---------------------科技------------------
  /**
   * 安装戴森球
   * @param {string} starId 星球名称
   */
  hideStar(starId) {
    let star = this.getStar(starId)
  }
  /**
   * 使用黑洞-毁灭星球
   * @param {string} starId 星球名称
   */
  destroyStar(starId) {

  }
  /**
   * 虫洞-传送兵力
   * @param {string} starId 星球名称
   * @param {number[]} transferCoordinate 目标坐标
   */
  transferArmy(starId = '', army = [0, 0, 0]) {

  }
  /**
   * 虫洞-传送星球
   * @param {string} starId 星球名称
   * @param {number[]} transferCoordinate 目标坐标
   */
  transferStar(starId = '', transferCoordinate = [0, 0, 0]) {

  }
  createStar(createCoordinate = [0, 0, 0]) {

  }
  /**
   * 发动攻击-军队首先进入星球范围，等待命令作战
   * @param {string} starId 星球名称
   */
  occupy(starId) { }
  /**
   * 侦察星球
   * @param {string} playerId 玩家id
   * @param {string} toStar 星球名称
   * {{time:number,starId1:string,starId2:string,distance:number}}
   */
  detect(playerId, toStar) {
    let uuid = UUID.v1()
    let distance = 0
    let starIds = this.getAllOwnStar(playerId)
    // 消耗时间
    this.starsDistance.get(toStar).forEach((v, k) => {
      if (starIds.includes(k)) {
        distance = v
        this.detectMap.set(uuid, {
          time: this.secondUp,
          toStar: toStar,
          toStarCoordinate: this.starsMap.get(toStar).coordinate,
          distance: v
        })
      }
    })
    return { uuid, distance }
  }
  /**
   * 作弊比较
   * @param {number[]} coordinate1 第一个坐标
   * @param {number[]} coordinate2 第二个坐标
   */
  _checkCoordinate(coordinate1, coordinate2) {
    return coordinate1.toString() !== coordinate2.toString()
  }
  detectCheck(uuid) {
    let detectLog = this.detectMap.get(uuid)
    let currentCoordinate = this.starsMap.get(detectLog.toStar).coordinate
    if (_checkCoordinate(currentCoordinate, detectLog.toStarCoordinate)) {
      return { exception: '星球不见了' }
    } else if (detectLog.distance > (this.secondUp - detectLog.time)) {
      return { exception: '你是个聪明人' }
    } else {
      return { result: this.starsMap.get(detectLog.toStar), exception: null }
    }
  }

  /**
   * 兵力集结命令
   * @param {string[]} stars 兵力输出星球
   * @param {string} star 兵力集结星球
   */
  // muster([...starIds], starId) {
  //   starIds.forEach((v, i, a) => {
  //     v.startMusterTime
  //     sumArmy += v.muster(starId)
  //   })
  // }




  /**
   * 根据两颗星球id获得距离
   * @param {string} fromStar 出发星球
   * @param {string} toStar 目标星球
   */
  getDistanceByStar(fromStar, toStar) {
    return this.starsDistance.get(toStar).get(fromStar)
  }

  /**
   * 获取当前游戏进行的时间
   */
  secondUp() {
    return Math.ceil(new Date().getTime() / 1000) - this.gameTime
  }
  /**
   * id自增
   *
   * @static _id
   * @memberof Game
   */
  static _id = 0
  /**
   * 按Id查询游戏信息
   *
   * @static getGame
   * @param {number} id gameId
   * @returns {Game} 游戏信息
   * @memberof Game
   */
  static getGame(id) {
    //db(id)
    let game;
    return game;
  }
  /**
   * 保存游戏信息
   *
   * @static saveGame
   * @param {Game} game
   * @memberof Game
   */
  static saveGame(game) {
    //db(game)
  }
  /**
   * 根据邻接矩阵，将星球分组
   *
   */
  starGroup() {

  }
}
// let g = new Game()
// g._initStars();
// console.log(g.starsMap)
module.exports = Game