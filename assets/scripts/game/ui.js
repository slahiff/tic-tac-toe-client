'use strict'

const store = require('../store')

const onSuccess = message => {
  $('#game-event')
    .html(message)
}

const onFailure = message => {
  $('#game-event')
    .html(message)
}

const onPlayerMove = (message) => {
  onSuccess(message)
}

const onGetTotalGames = (responseData) => {
  onGetTotalGames($('#total-gamnes').text(store.game.id))
}

const onCreateGameSuccess = (responseData) => {
  store.game = responseData.game
  $('form').trigger('reset')
  $('#gameID').text(`Game ID: ${store.game.id}`)
  $('.box').html('')
  $('#message').text('New game started!')
}
//
// const onCreateGameFailure = () => {
//   onFailure('Hmmm.. something went wrong. Try again.')
// }

module.exports = {
  onSuccess,
  onFailure,
  onPlayerMove,
  onGetTotalGames,
  onCreateGameSuccess
}
