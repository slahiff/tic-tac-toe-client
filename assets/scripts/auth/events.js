'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')

// Authentication
const onSignUp = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.signUp(formData)
    .then(ui.onSignupSuccess)
    .catch(ui.onSignupFailure)
}

const onSignIn = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.signIn(formData)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onChangePassword = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const onSignOut = event => {
  event.preventDefault()

  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

// ##Game Logic

const game = {
  id: 1,
  cells: ['', '', '', '', '', '', '', '', ''],
  over: false,
  player_x: {
    id: 1,
    email: store.user.email
  },
  player_o: null
}

// Set initial player value
let currentPlayer = 'X'
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
  $('.col-4').text('')
  $('.col-4').on('click', currentPlayer)
  const game = {
    id: 1,
    cells: ['', '', '', '', '', '', '', '', ''],
    over: false
  }
  game.cells[event.target.id] = currentPlayer
  console.log('New Game clicked', game)
}

// const resetGame = () => {
//   updateUserMessage('New game!')
//   $('.col-sm').html('')
//   cells = ['', '', '', '', '', '', '', '', '']
//   currentPlayer = 'X'
//   over = false
//   updateCurrentPlayerMessage()
//   createGame()
// }

const checkWinner = () => {
  if ( // square 0 winners
    ((game.cells[0] === game.cells[1] && game.cells[0] === game.cells[2]) && game.cells[0] !== '') ||
  ((game.cells[0] === game.cells[3] && game.cells[0] === game.cells[6]) && game.cells[0] !== '') ||
  ((game.cells[0] === game.cells[4] && game.cells[0] === game.cells[8] && game.cells[0] !== ''))) {
    console.log('Player', game.cells[0] + ' has won!')
    $('#game-event').text('Player ' + game.cells[0] + ' wins!!')
    game.over = true
  } else if ( // square 1 winner
    ((game.cells[1] === game.cells[4] && game.cells[1] === game.cells[7]) && game.cells[1] !== '')) {
    console.log('Player', game.cells[1] + ' has won!')
    $('#game-event').text('Player ' + game.cells[1] + ' wins!!')
    game.over = true
  } else if ( // square 2 winner
    ((game.cells[2] === game.cells[5] && game.cells[2] === game.cells[8]) && game.cells[2] !== '') ||
    ((game.cells[2] === game.cells[4] && game.cells[2] === game.cells[6]) && game.cells[2] !== '')) {
    console.log('Player', game.cells[2] + ' has won!')
    $('#game-event').text('Player ' + game.cells[2] + ' wins!!')
    game.over = true
  } else if ( // square 3 winner
    ((game.cells[3] === game.cells[4] && game.cells[3] === game.cells[5] && game.cells[3] !== ''))) {
    console.log('Player', game.cells[3] + ' has won!')
    $('#game-event').text('Player ' + game.cells[3] + ' wins!!')
    game.over = true
  } else if ( // square 6 winner
    ((game.cells[6] === game.cells[7] && game.cells[6] === game.cells[8] && game.cells[6] !== ''))) {
    console.log('Player', game.cells[6] + ' has won!')
    $('#game-event').text('Player ' + game.cells[6] + ' wins!!')
    game.over = true
  } else if (
    game.cells[0] !== '' && game.cells[1] !== '' && game.cells[2] !== '' && game.cells[3] !== '' && game.cells[4] !== '' && game.cells[5] !== '' && game.cells[6] !== '' && game.cells[7] !== '' && game.cells[8] !== '') {
    // console.log('Game drawn!')
    $('#game-event').text('Looks like a stalemate... game drawn!!')
    game.over = true
  } else {
    $('#game-event').text('Player ' + currentPlayer + ' - your move!')
  }
}

const onPlayerMove = event => {
  event.preventDefault()

  if (($(event.target).html() === '') && (currentPlayer === 'X')) {
    $(event.target).text('X')
    game.cells[event.target.id] = currentPlayer
    console.log('Game ID:', game.id, game.cells, 'Game Over?: ', game.over)
    console.log(game)
    // $('#game-event').text('Player O - your move!')
    switchPlayer()
    checkWinner()
  } else if (($(event.target).html() === '') && (currentPlayer === 'O')) {
    $(event.target).text('O')
    game.cells[event.target.id] = currentPlayer
    console.log(game)
    // $('#game-event').text('Player X - your move!')
    switchPlayer()
    checkWinner()
  } else {
    // $('#game-event').text('This space is already taken!')
    console.log('Space already taken!')
  }
}

const onGetTotalGames = event => {
  event.preventDefault()
  if ((event.target).html() === '') {
    $(event.target).text('Games Played: ', store.games.id)
  } else {
    $(event.target).text('Games Played: ', store.games.id)
  }
  api.getTotalGames()
}

const addHandlers = event => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#create-game').on('click', onNewGame)
  $('.col-4').on('click', onPlayerMove)
  // $('.col-4').on('click', checkWinner)
  $('#get-total-games').on('click', onGetTotalGames)
  // $('#create-game').on('click', onCreateGame)
}

module.exports = {
  addHandlers
}

// cells.[event.target.id] =currentPlayer
