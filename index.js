const express = require('express')
const config = require('./config')

const validator = require('./src/middleware/validator.js')

const Game = require('./src/app/game.js')
const game = new Game()


const app = express()

//*************************** VALIDATOR ****************************************
app.use(validator)

//***************************** VALID URL ROUTING ******************************
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.post('/tile', (req, res) => { // /tile?x=x&y=y&c=c&id=ID
  const tile = {
    x: parseInt(req.query.x),
    y: parseInt(req.query.y),
    hexStr: `${req.query.c}`
  }
  game.setTile(tile, req.query.id)
  res.send(true)
})

app.get('/tile', (req, res) => {
  const payload = JSON.stringify(game.getTile(req.query.x, req.query.y))
  res.send(payload)
})

// board?id=0; id coming from browser client config for requestor verification
app.get('/board', (req, res) => {
  res.send(new Buffer(game.getBoard(), 'binary'))
})


//***************************** REQ ERROR HANDLING *****************************
app.use((err, req, res, next) => {
  res.status(500).send('something went wrong!: ', err.stack)
})

app.use((req, res) => {
  res.status(400).send('endpoint not found')
})


//*********************************** START! ***********************************

app.listen(config.HTTPPORT, () => {
  console.log("API server loaded with config:\n", config)
  console.log(`App listening on port ${config.HTTPPORT}!`)
})
