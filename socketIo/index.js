const socketIo = require('socket.io')
const Game = require('../starCore/Game')
const Player = require('../starCore/Player')
const regMatch = require('../util/regMatch')

/**
 * socket.id=>game
 * @type {Map<string,Game>} socketId/playerId/gameId/roomId
 */
let rooms = new Map()
let waitGame = []
let io

exports.listen = function (server) {
  io = socketIo(server)
  io.on('connection', (socket) => {
    if (!socket.player) {
      socket.player = new Player(socket.id)
    }
    console.log('连接成功' + socket.id)
    socket.on('createGame', data => {

      createGame(socket, data)
      // socket.emit('getMsg', '我是返回的消息... ...')
    })
    socket.on('initGame', data => {

      initGame(socket)
      // socket.emit('getMsg', '我是返回的消息... ...')
    })
    socket.on('joinGame', data => {

      joinGame(socket, data)
      // socket.emit('getMsg', '我是返回的消息... ...')
    })
    socket.on('abut', data => {

      abut(socket, data)
      // socket.emit('getMsg', '我是返回的消息... ...')
    })
    socket.on('detect', data => {

      detect(socket, data)
      // socket.emit('getMsg', '我是返回的消息... ...')
    })
    socket.on('moveArmy', data => {

      moveArmy(socket, data)
      // socket.emit('getMsg', '我是返回的消息... ...')
    })
    socket.on('muster', data => {

      muster(socket, data)
      // socket.emit('getMsg', '我是返回的消息... ...')
    })
    socket.on('transferStar', data => {

      transferStar(socket, data)
      // socket.emit('getMsg', '我是返回的消息... ...')
    })
    socket.on('destroy', data => {

      destroy(socket, data)
      // socket.emit('getMsg', '我是返回的消息... ...')
    })
    socket.on('hide', data => {

      hide(socket, data)
      // socket.emit('getMsg', '我是返回的消息... ...')
    })
    socket.on('createStar', data => {

      createStar(socket, data)
      // socket.emit('getMsg', '我是返回的消息... ...')
    })
    socket.on('occupy', data => {

      occupy(socket, data)
      // socket.emit('getMsg', '我是返回的消息... ...')
    })
  })
  io.on('disconnect', (socket) => {

  })
}

/**
 * 游戏初始化
 * @param {SocketIO.Socket} socket 
 * @param {string} data 
 */
let singleGame = (socket) => {
  console.log('singleGame')
  let game = new Game(1)
  initStar([0, 0, 0])
  game.toMap.set(socket.player.id, new Map())
  rooms.set(game.id, game)
  socket.join(game.id)
  socket.game = game
  game.initStar()
  game.initGame()
  socket.emit('getMsg', '游戏开始' + game.state)
}
/**
 * 创建游戏
 * @param {SocketIO.Socket} socket 
 * @param {string} data 
 */
let createGame = (socket, data = '') => {
  console.log('createGame')
  //data 模式
  let game = new Game(2)
  initStar(0, 0, 0)
  waitGame.push(game.id)
  game.toMap.set(socket.player.id, new Map())
  rooms.set(game.id, game)
  socket.join(game.id)
  socket.game = game
  socket.emit('getMsg', '等待玩家加入...' + game.id)
}
/**
 * 加入游戏
 * @param {SocketIO.Socket} socket 
 * @param {string} data 
 */
let joinGame = (socket, data) => {
  console.log('joinGame')
  let { gameId } = regMatch.joinGameMatch(data)
  if (!gameId) {
    gameId = waitGame.shift()
  }
  socket.join(gameId)
  let game = rooms.get(gameId)
  game.toMap.set(socket.player.id, new Map())
  game.initGame()
  initStar()
  socket.game = game
  io.sockets.in(gameId).emit('getMsg', '游戏开始' + game.state + game.id)
}


//获取所有拥有的星球
let getAllOwnStar = ()=>{
  let starsArray = []
  /**
   * @type {Game}
   */
  let game = socket.game
  game.stars.forEach(star=>{
    if(star.belong=socket.id){
      starsArray.push(star)
    }
  })
  return starsArray
}
//获取所有邻接星球
let getAllAbutStar = ()=>{
  let abutStars = []
  /**
   * @type {Player}
   */
  let player = socket.player
  /**
   * @type {Game}
   */
  let game = socket.game
  game.stars.forEach(star=>{
    if(star.belong=socket.id){
      abutStars.concat(game.abut(star.id,player.steps))
    }
  })
  return new Set(abutStars)
}
/**
 * 邻近星球
 * @param {SocketIO.Socket} socket 
 * @param {string} data 命令
 */
let abut = (socket, data) => {
  console.log('abut')
  let { starId } = regMatch.abutMatch(data)
  /**
   * @type {Player}
   */
  let player = socket.player
  let game = rooms.get(player.gameId)
  let abutStars = game.getAbutStar(starId, player.steps)
  socket.emit('getMsg', abutStars)
}
/**
 * 侦察
 * @param {SocketIO.Socket} socket 
 * @param {string} data 命令
 */
let detect = (socket, data) => {

  socket.emit('getMsg', 'detect')
}
/**
 * starId1向starId2输送兵力若干（army1为空则为全部）
 * @param {SocketIO.Socket} socket 
 * @param {string} data 命令
 */
let moveArmy = (socket, data) => {//TODO
  let { starId1, starId2, army } = regMatch.moveArmyMatch(data)
  /**
   * @type {Game}
   */
  let game = socket.game

  game.moveArmy(socket.player.id, starId1, starId2, army * 1)

  socket.emit('getMsg', 'moveArmy')
}
/**
 * starId1向starId2集结兵力
 * @param {SocketIO.Socket} socket 
 * @param {string} data 命令
 */
let muster = (socket, data) => {
  let { starId1, starId2 } = regMatch.musterMatch(data)
  /**
   * @type {Game}
   */
  let game = socket.game
  game.startMuster(socket.player.id, starId1, starId2)

  socket.emit('getMsg', 'muster')
}
/**
 * 将兵力（缺省为全部）从星球1传送至星球2
 * @param {SocketIO.Socket} socket 
 * @param {string} data 命令
 */
let transferArmy = (socket, data) => {
  let { starId1, starId2, army } = regMatch.transferArmyMatch(data)
  /**
   * @type {Player}
   */
  let player = socket.player
  let game = rooms.get(player.gameId)
  game.transferArmy(starId1, starId2)


  socket.emit('getMsg', abutStars)
}
/**
 * 将星球传送至坐标2
 * @param {SocketIO.Socket} socket 
 * @param {string} data 命令
 */
let transferStar = (socket, data) => {
  let { starId, x, y, z } = regMatch.transferStarMatch(data)

  socket.emit('getMsg', abutStars)
}
/**
 * 利用黑洞毁灭starId1（只能是自己的星球或邻近星球）
 * @param {SocketIO.Socket} socket 
 * @param {string} data 命令
 */
let destroy = (socket, data) => {

  socket.emit('getMsg', abutStars)
}
/**
 * 利用戴森球隐藏starId1
 * @param {SocketIO.Socket} socket 
 * @param {string} data 命令
 */
let hide = (socket, data) => {

  socket.emit('getMsg', abutStars)
}
/**
 * 在坐标1创建星球
 * @param {SocketIO.Socket} socket 
 * @param {string} data 命令
 */
let createStar = (socket, data) => {

  socket.emit('getMsg', abutStars)
}
/**
 * 攻击星球1的敌人
 * @param {SocketIO.Socket} socket 
 * @param {string} data 命令
 */
let occupy = (socket, data) => {

  socket.emit('getMsg', abutStars)
}












let commandRoutes = (socket, command = '') => {

  if (command === 'create game') {//按钮
    let game = Game.createGame()
    rooms.set(socket.id, game)
    socket.join(game.id)

    socket.emit('getMsg', '等待玩家加入')
  } else if (command === 'init game') {//按钮
    let game = rooms.get(socket.id)
    game.initGame()

    socket.emit('getMsg', '游戏开始')
  } else if (regMatch.joinGameMatch(command)) {//按钮
    joinGameReg.exec(command)
    socket.join('game.id')//参数
    game.initGame()

    socket.emit('getMsg', '游戏开始')
  } else if (regMatch.aaa(command)) {//邻近星球

    socket.emit('getMsg', '等待玩家加入')
  } else if (regMatch.aaa(command)) {//侦察

    socket.emit('getMsg', '等待玩家加入')
  } else if (regMatch.aaa(command)) {//调动兵力

    socket.emit('getMsg', '等待玩家加入')
  } else if (regMatch.aaa(command)) {// 集结兵力

    socket.emit('getMsg', '等待玩家加入')
  } else if (regMatch.aaa(command)) {//传送兵力

    socket.emit('getMsg', '等待玩家加入')
  } else if (regMatch.aaa(command)) {//传送星球
    socket.id
  } else if (regMatch.aaa(command)) {//传送星球
    socket.id
  } else if (regMatch.aaa(command)) {//传送星球
    socket.id
  } else if (regMatch.aaa(command)) {//传送星球
    socket.id
  } else if (regMatch.aaa(command)) {//传送星球
    socket.id
  }






  switch (command) {
    case 'create game':// 玩家1
      break;
    case 'init game':// 玩家2
      socket.game.initGame()
      socket.emit('getMsg', socket.game.toString())
      break;
    // case 'create game':
    //   Game.createGame()
    //   return;//initGame
    default:
      break;
  }
}
