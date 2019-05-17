const Koa = require('koa')
const app = new Koa()
const static = require('koa-static')
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)
const port = 3001

const Game = require('../starCore/Game')

server.listen(process.env.PORT || port, () => {
  console.log(`app run at : http://127.0.0.1:${port}`)
})
app.use(static('./public'))

io.on('connection', socket => {
  console.log('初始化成功！下面可以用socket绑定事件和触发事件了')
  socket.on('send', data => {
    console.log('客户端发送的内容：', data)
    let game

    switch (data) {
      case 'create game':
        game = Game.createGame()
        break;
      case 'init game':
        Game.initGame()
        break;
      // case 'create game':
      //   Game.createGame()
      //   return;//initGame
      default:
        break;
    }

    socket.emit('getMsg', game)
  })

  //  setTimeout( () => {
  //      socket.emit('getMsg', '我是初始化3s后的返回消息... ...') 
  //  }, 3000)
})