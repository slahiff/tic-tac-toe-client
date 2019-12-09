'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

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

const onNewGame = event => {
  event.preventDefault()

  $('.box').html('')
  currentPlayer = 'X'
  console.log('New Game clicked')

  api.newGame()
}
// records move on UI and adds to cells array
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
    console.log(cells)
    // api.updateGame()
  } else if (($(event.target).html() === '') && (currentPlayer === 'O')) {
    $(event.target).text('O')
    // update cells array
    cells[event.target.id] = currentPlayer
    console.log(cells)

    ui.onPlayerMove('Player X - your move!')
    switchPlayer()
    checkWinner()
    checkGameOver()
    // api.updateGame()
  } else {
    $('#game-event').text('This space is already taken!')
    console.log(event.target)
  }
}

const checkWinner = () => {
  if ( // square 0 winners
    ((cells[0] === cells[1] && cells[0] === cells[2]) && cells[0] !== '') ||
    ((cells[0] === cells[3] && cells[0] === cells[6]) && cells[0] !== '') ||
    ((cells[0] === cells[4] && cells[0] === cells[8] && cells[0] !== ''))) {
    console.log('Player', cells[0] + ' has won!')
    $('#game-event').text('Player ' + cells[0] + ' wins!!')
    over = true
  } else if ( // square 1 winner
    ((cells[1] === cells[4] && cells[1] === cells[7]) && cells[1] !== '')) {
    console.log('Player', cells[1] + ' has won!')
    $('#game-event').text('Player ' + cells[1] + ' wins!!')
    over = true
  } else if ( // square 2 winner
    ((cells[2] === cells[5] && cells[2] === cells[8]) && cells[2] !== '') ||
    ((cells[2] === cells[4] && cells[2] === cells[6]) && cells[2] !== '')) {
    console.log('Player', cells[2] + ' has won!')
    $('#game-event').text('Player ' + cells[2] + ' wins!!')
    over = true
  } else if ( // square 3 winner
    ((cells[3] === cells[4] && cells[3] === cells[5] && cells[3] !== ''))) {
    console.log('Player', cells[3] + ' has won!')
    $('#game-event').text('Player ' + cells[3] + ' wins!!')
    over = true
  } else if ( // square 6 winner
    ((cells[6] === cells[7] && cells[6] === cells[8] && cells[6] !== ''))) {
    console.log('Player', cells[6] + ' has won!')
    $('#game-event').text('Player ' + cells[6] + ' wins!!')
    over = true
  } else if (
    cells[0] !== '' && cells[1] !== '' && cells[2] !== '' && cells[3] !== '' && cells[4] !== '' && cells[5] !== '' && cells[6] !== '' && cells[7] !== '' && cells[8] !== '') {
    // console.log('Game drawn!')
    $('#game-event').text('Looks like a stalemate... game drawn!!')
    over = true
  } else {
    $('#game-event').text('Player ' + currentPlayer + ' - your move!')
  }
}

const checkGameOver = boolean => {
  if (over === true) {
    $('.box').off('click', onPlayerMove)
  }
}

// const onGetTotalGames = () => {
//   event.preventDefault()
//
//   api.getTotalGames()
//     .then(ui.getTotalGamesSuccess)
// }

const addHandlers = event => {
  $('#create-game').on('click', onNewGame)
  $('.box').on('click', onPlayerMove)
  // $('#get-total-games').on('click', onGetTotalGames)
  // $('#create-game').on('click', onCreateGame)
}

module.exports = {
  addHandlers
}
