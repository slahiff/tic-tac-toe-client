'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

// Set initial player & game values
let currentPlayer = 'X'
let cells = ['', '', '', '', '', '', '', '', '']
let over = false

// function that switches between player
const switchPlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O'
  } else {
    currentPlayer = 'X'
  }
}

// create new game
const onNewGame = event => {
  event.preventDefault()

  api.newGame()
  over = false
  cells = ['', '', '', '', '', '', '', '', '']
  cells = store.game.cells
  currentPlayer = 'X'
  $('.box').html('')
  $('.box').on('click', onPlayerMove)
  $('#game-event').text('New game started: Player X - make your first move!')
}
// records move on UI and adds to stored cell array
const onPlayerMove = event => {
  event.preventDefault()

  if (($(event.target).html() === '') && (currentPlayer === 'X')) {
    $(event.target).html('X')
    // update cells array
    cells[event.target.id] = currentPlayer
    ui.onPlayerMove('Player O - your move!')
    switchPlayer()
    checkWinner()
    checkGameOver()
    api.updateGame(cells, currentPlayer, over)
    console.log(cells, store)
    // api.updateGame()
  } else if (($(event.target).html() === '') && (currentPlayer === 'O')) {
    $(event.target).text('O')
    // update cells array
    cells[event.target.id] = currentPlayer
    console.log(store)

    ui.onPlayerMove('Player X - your move!')
    switchPlayer()
    checkWinner()
    checkGameOver()
    api.updateGame(cells, currentPlayer, over)
    // api.updateGame()
  } else {
    $('#game-event').text('This space is already taken!')
    api.updateGame(event.target, currentPlayer, over)
  }
}

const checkWinner = () => {
  if ( // square 0 winners
    ((cells[0] === cells[1] && cells[0] === cells[2]) && cells[0] !== '') ||
    ((cells[0] === cells[3] && cells[0] === cells[6]) && cells[0] !== '') ||
    ((cells[0] === cells[4] && cells[0] === cells[8] && cells[0] !== ''))) {
    $('#game-event').text('Player ' + cells[0] + ' wins!!')
    over = true
  } else if ( // square 1 winner
    ((cells[1] === cells[4] && cells[1] === cells[7]) && cells[1] !== '')) {
    $('#game-event').text('Player ' + cells[1] + ' wins!!')
    over = true
  } else if ( // square 2 winner
    ((cells[2] === cells[5] && cells[2] === cells[8]) && cells[2] !== '') ||
    ((cells[2] === cells[4] && cells[2] === cells[6]) && cells[2] !== '')) {
    $('#game-event').text('Player ' + cells[2] + ' wins!!')
    over = true
  } else if ( // square 3 winner
    ((cells[3] === cells[4] && cells[3] === cells[5] && cells[3] !== ''))) {
    $('#game-event').text('Player ' + cells[3] + ' wins!!')
    over = true
  } else if ( // square 6 winner
    ((cells[6] === cells[7] && cells[6] === cells[8] && cells[6] !== ''))) {
    $('#game-event').text('Player ' + cells[6] + ' wins!!')
    over = true
  } else if (
    cells[0] !== '' && cells[1] !== '' && cells[2] !== '' && cells[3] !== '' && cells[4] !== '' && cells[5] !== '' && cells[6] !== '' && cells[7] !== '' && cells[8] !== '') {
    $('#game-event').text('Looks like a stalemate... game drawn!!')
    over = true
  } else {
    $('#game-event').text('Player ' + currentPlayer + ' - your move!')
  }
}

const checkGameOver = boolean => {
  if (over === true) {
    $('.box').off('click', onPlayerMove)
    store.game = {}
  }
}

const onGetTotalGames = event => {
  event.preventDefault()
  api.getTotalGames()
  document.getElementById('get-total-games').innerHTML = store.game.length
}

const addHandlers = event => {
  $('#create-game').on('click', onNewGame)
  $('.box').on('click', onPlayerMove)
  $('#get-total-games').on('click', onGetTotalGames)
  // $('#create-game').on('click', onCreateGame)
}

module.exports = {
  addHandlers
}
