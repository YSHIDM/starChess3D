// star：最大资源存储-，最大资源（耗尽），最大兵力存储-，产兵速度^3，防御等级^3，戴森球？，
// let defenceLevelInfo = [
//   { defence: 1, developed: 100, army: 10 },
//   { defence: 2, developed: 100, army: 10 },
//   { defence: 3, developed: 100, army: 10 },
// ]
// let productionLevelInfo = [
//   { production: 1, developed: 100 },
//   { production: 2, developed: 100 },
//   { production: 3, developed: 100 },
// ]

/**
 * 方法应该分3类，工具类，静止类，输送类
 */
class Star {
  constructor(coordinate = [0, 0, 0]) {
    this.id = Star._id++ + ''               // 星球id
    this.coordinate = [...coordinate];       // 星球坐标
    this.belong = ''            // 用户id
    this.ownDysonBall = false;  // 是否拥有戴森球

    // this.startMusterTime = 0;      // 兵力输出时间：字典调整，作废
    this.receiveArmyTime = 0              //兵力接收时间，既是fromStar发兵时间
    this.military = 0;          // 军队生产力
    /** 
     * 
     * 军队结算时间/兵力生产时间：时间差*生产力=生产军队
     * 1.停止输出军队，2.军队结算
     */
    this.startMilitaryTime = 0;
    this.armies = {}            // {playerId:army} 野怪/军队
    this.musterTo = '';         // 兵力输出目标

    this.defence = 0;           // 防御
    this.defenceLevel = 0;      // 防御力等级

    this.production = 0;        // 生产力
    this.productionLevel = 0;   // 生产力等级
    this.productSettle = 0;     // 资源统计时间戳 productTimestamp
    this.resources = 0;         // 星球拥有资源
  }
  /**
   * id自增
   *
   * @static _id
   * @memberof Star
   */
  static _id = 0;

  static defenceLevelInfos = [
    { defence: 300, developed: 100, army: 100 },
    { defence: 600, developed: 100, army: 200 },
    { defence: 900, developed: 100, army: 300 },
  ]
  static productionLevelInfos = [
    { production: 10, military: 10, developed: 100 },
    { production: 20, military: 20, developed: 100 },
    { production: 30, military: 30, developed: 100 },
  ]

  /**
   * 防御力升级
   *
   * @param {string} playerId
   * @param {function} pay(resources)
   */
  upgradeDefence(playerId, pay) {
    if (playerId === this.belong) {
      let defenceLevelInfo = Star.defenceLevelInfos[this.defenceLevel];
      if (!defenceLevelInfo) {
        return 'max';
      } else if (musterTo) {
        return 'musterTo';
      } else {
        armySettle();
        if (!this.armies[playerId] > defenceLevelInfo.army) {
          return 'lack army'
        }
        if (pay(defenceLevelInfo.developed)) {
          this.defence += defenceLevelInfo.defence;
          this.armies[playerId] -= defenceLevelInfo.army;
          return 'ok';
        } else {
          return 'lack resources';
        }
      }
    } else {
      return 'no permission';
    }
  }
  /**
   * 资源及军队生产力升级
   * @param {*} playerId 
   */
  upgradeProduction(playerId, pay) {
    if (playerId === this.belong) {
      let productionLevelInfo = Star.productionLevelInfos[this.productionLevel];
      if (!productionLevelInfo) {
        return 'max';
      } else {
        if (pay(productionLevelInfo.developed)) {
          this.production += productionLevelInfo.production;
          this.military += productionLevelInfo.military;
          if (musterTo) {//正在输送兵力，则需要结算 musterLogs
            starsMapUtil.endMuster(this.id, musterTo);
            starsMapUtil.startMuster(this.id, musterTo, this.military);
          }
          return 'ok';
        } else {
          return 'pay fail';
        }
      }
    } else {
      return 'no permission';
    }
  }
  /**
   * 军队产出结算
   * @param {number} now 结算时间
   */
  militarySettle(now) {// ok
    return (now - this.startMilitaryTime + 1) * this.military;
  }

  // /**
  //  * 输出兵力//存入星图
  //  * @param {string} toStar 兵力数量,num 大于总兵力或小于零，则赋值为总兵力
  //  * @param {number} num 兵力数量,num 大于总兵力或小于零，则赋值为总兵力
  //  */
  // sendArmy(playerId,toStar, num = 0) {
  //   this.armySettle();
  //   if (num < 0 || num > this.armies[playerId]) {
  //     num = this.army;
  //   }
  //   this.army -= num;
  //   //调动军队时间戳
  //   starsMapUtil.moveArmy(this.id, toStar, num, now);
  // }
  // /**
  //  * 向目标星球集结军队//存入星图
  //  * @param {string} toStar 目标星球
  //  */
  // musterArmy(toStar) {
  //   this.startMusterTime = new Date().getTime();
  //   this.musterTo = toStar;
  //   this.sendArmy(toStar);
  //   starsMapUtil.startMuster(this.id,toStar,this.military);
  // }
  // /**
  //  * 到达指定目标的军队数量
  //  * @param {string} toStar 目标星球
  //  */
  // toArmySettle(toStar) {
  //   starsMapUtil.massByTime(this.id, toStar);
  // }
  // static saveStar(star) {
  //   //内存/DB
  // }
  // /**
  //  *
  //  *
  //  * @static
  //  * @param {*} starId
  //  * @returns {Star}
  //  * @memberof Star
  //  */
  // static getStar(starId) {
  //   let star;
  //   return star;
  // }
  // static starsChange() {
  // }
  // /**
  //  * 虫洞-传送军队
  //  * @param {string} starId 星球名称
  //  * @param {number} armyNum 军队数量
  //  * @param {number[]} transferCoordinate 目标坐标
  //  */
  // static transferArmy(starId = '', transferCoordinate = [0, 0, 0], armyNum = 0) {
  //   let allArmy = Star.getStar(starId).armySettle();
  //   if (!army || army > allArmy) {
  //     army = allArmy;
  //   }
  // }

}

//==========================================
let getStar = (starName) => {
  if (starName) {
    return star;
  } else {
    return getStarByDB(starName);
  }
}
let getStarByDB = (starName) => {
  return star;
}

module.exports = Star