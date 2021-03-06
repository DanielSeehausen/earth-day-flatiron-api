const config = require('../../config.js')
const Canvas = require('./canvas.js')


class Game {
  constructor() {
    this.canvas = new Canvas(config.ROWS, config.COLUMNS)
    this.wss = require('./wss.js')
  }

  setTile(tile) {
    // {x, y, hexStr} sans '#' on hexStr
    this.canvas.setTile(tile)
    this.wss.emit({ action: 'writeTile', payload: tile })
  }

  getTile(coords) {
    return this.canvas.getTile(coords)
  }

  getBoard() {
    return this.canvas.buffer
  }

  toJSON() {
    return {
      board: this.canvas.toJSON()
    }
  }
}

module.exports = Game
