const Game = require('./Game');
const Player = require('./Player');

/* 你想太多了，先做别的
let createGame = ()=> {
  Game.saveGame(new Game())
  //
}
let createPlayerByGame = ()=> { 
  let gameId;//ctx.game.id
  Player.savePlayer(new Player(gameId))
}
let getPlayer = ()=> {
  let id; //前台或ctx
  Player.getPlayer(id);
}
let getGame = ()=> {
  let id; //前台或ctx
  Game.getGame(id)
}
let joinGame = ()=> {
  comment= '加入游戏',
  invoke=['getGame', '(new Player)']
}
*/
let getOwnStarList = () => '获取拥有的星球列表'
let getStarInfo = () => '获取星球信息'
let getNeighbourStar = () => '获取临近星球'
let getNeighbourStarList = () => '获取所有临近星球'
// let getNeighbourAllStar = () => '获取临近星球'
// let getNeighbourAllStarList = () => '获取所有临近星球'
let getAllStarCoordinate = () => '获取所有星球坐标'
let getStarGroup = () => '获取星球分组信息'
let navigate = () => '获取两颗星球最近距离'

let upgradeDefence = () => '升级星球防御力'
let upgradeProduction = () => '升级星球生产力'
let upgradeTechnology = () => '升级科技'
let upgradeTravel = () => '星际旅行升级'

let detect = () => '侦察星球'
/**
 * 
 * 
 * @param {*} starId1 
 * @param {*} starId2 
 * @param {*} army1 
 */
let sendArmy = (starId1, starId2, army) => {
  //是否正在集结兵力？return：next
  //!army||army>this.army?全部兵力：army
  //util push army&date
  //this.army = 0
  Star.getStar(starId1).sendArmy(starId2,army);
}//'向星球派兵'
let musterArmy = (starId1, starId2) => {
  //是否正在集结兵力？return：next
  // musterArmy
  // // sendArmy(util push army&date)
  // // // armySettle
  // // // //this.army+=生产兵力（militarySettle）
  // // // //this.army+=接收结算（receiveSettle）
  // // util push military
  Star.getStar(starId1).musterArmy(starId2,army);
}//'向星球集结兵力'
let occupy = () => '发动攻击'
let fallback = () => '撤退'
let hide = () => '安装戴森球'
let destroy = () => '使用黑洞-毁灭星球'
let transferArmy = (starId, starId2, army ) =>{//再定，优先musterArmy
  Star.transferArmy(starId, [x, y, z],army );

}// '传送兵力'
let transferStar = (starId, [x, y, z]) => {
  Star.getStar(starId)
  Star.starsChange()
}//'传送星球'
let createStar = ([x, y, z]) => {
  Star.saveStar(new Star([x, y, z]));
  Star.starsChange()
}//'创造星球'