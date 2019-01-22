const cluster = require('cluster')

const config = require('./config.js')
const GameInitializer = require('./src/GameInitializer.js')
const Supervisor = require('./src/cluster/Supervisor.js')

async function start() {
  console.log('\n\nServer starting with config:\n\n', config)

  console.log('\n\nInitializing game state in redis...')
  await GameInitializer.initialize()
  console.log('...finished initializing game state')

  console.log('\n\nStarting Workers...')
  await Supervisor.forkWorkers(config.WORKERCOUNT)
  console.log('...done')

  // console.log('\n\nStarting Websocket Server...')
  // 3. start websocket server
}

if (cluster.isMaster) {
  start()
} else {
  Supervisor.startWorker()
  // test()
}

function test() {
  c.print()
  c.setTile(0, 1, 'ffffff').then(c.print)
}

