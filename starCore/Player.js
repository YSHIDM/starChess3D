/* 玩家 */
// const mapping = require('./星距.json')

/*
星际旅行：10，量子通信20，人工智能30，星际网40，可控聚变50，

戴森球：消耗资源，+1马

黑洞：消耗资源50

虫洞：持续消耗资源50+10/s
*/
let travels = [
  { name: '星际旅行', developed: 100, effect: '开启星际探索[实现]' },
  { name: '量子科技', developed: 200, effect: '侦察时间减半' },
  { name: '人工智能', developed: 300, effect: '取消最大兵力' },
  { name: '星际网络', developed: 400, effect: '全图星球信息' },
  { name: '可控聚变', developed: 500, effect: '开启高级科技[实现]' }
]
let technologies = [
  { name: '戴森球', developed: 500, resources: 500, effect: '资源、兵力产量及防御翻倍，敌方无法侦察，只能通过传送进入' },
  { name: '微型黑洞', developed: 1000, resources: 1000, effect: '毁灭一颗星球，及其附近所有兵力' },
  { name: '微型虫洞', developed: 1500, resources: 2100, effect: '传送军队' },
  { name: '星球传送', developed: 2000, resources: 10000, effect: '传送星球' },
  { name: '星球创造', developed: 2500, resources: 30000, effect: '创造一颗满级星球' },
]

class Player {
  constructor(socketId) {
    this.id = socketId
    this.userId = 0
    this.resources = 0
    this.level = 0
    this.steps = 0
    this.ownTechnologies = 0
  }
  /**
   * 星际旅行升级
   */
  upgradeTravel() {
    let travel = travels[this.level]
    if (!travel) {
      return false
    }
    if (this.resources > travel.developed) {
      this.resources -= travel.developed
      this.level += 1
      this.steps = this.level * 10
      return true
    } else {
      return false
    }
  }
  /**
   * 技能升级
   */
  upgradeTechnology() {
    if (this.level <= 5) {
      return
    }
    let technology = technologies[this.ownTechnologies]
    if (!technology) {
      return false
    }
    if (this.resources > technology.developed) {
      this.resources -= technology.developed
      this.ownTechnologies += 1
      return true
    } else {
      return false
    }
  }
  /**
   * 总资源
   */
  countResources() {

  }





  /**
   * 获取星球信息
   * @param {string} starId 星球名称
   */
  // getStar(starId) { }

  /**
   * 按Id查询玩家信息
   *
   * @static getPlayer
   * @param {number} id playerId
   * @returns {Player} 玩家信息
   * @memberof Player
   */
  static getPlayer(id) {
    //db(id)
    let player
    return player
  }
  /**
   * 保存玩家信息
   *
   * @static
   * @param {number} player
   * @memberof Player
   */
  static savePlayer(player) {
    //db(game)
  }
}
// let Game = require('./Game')
// let game = new Game()
// game.starsMap.set(1,new Map().set(2,111))
// new Player().test(game.getDistanceByStar)
module.exports = Player
