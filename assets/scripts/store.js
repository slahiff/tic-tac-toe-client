'use strict'

const store = {
  user: {},
  game: {
    id: 1,
    cells: ['', '', '', '', '', '', '', '', ''],
    complete: false
  },
  player_x: {
    id: 1,
    email: '',
    value: 'X'
  },
  player_o: null
}

module.exports = store
