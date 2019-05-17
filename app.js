const Koa = require('koa')

const static = require('koa-static')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
// const jwt = require('koa-jwt')

const path = require('path')

// const err = require('./middlreware/error')
// const secret = require('./config/secret.json')
const socketIo = require('./socketIo')

const port = 3001

const app = new Koa()

// app.use(err())
app.use(logger())
app.use(bodyParser())
// app.use(jwt({ secret: secret.sign }).unless({ path: [/^\/api\/login/, /^\/api\/createUser/] }))
app.use(static(path.join( __dirname, './view/')))

const server = app.listen(port, () => {
  console.log('Server listening at port %d', port)
})

socketIo.listen(server)
