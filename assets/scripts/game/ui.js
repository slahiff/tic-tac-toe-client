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

const onGetTotalGames = () => {
  onGetTotalGames($('#total-gamnes').text(store.game.id))
}

// const onCreateGameSuccess = () => {
//   onSuccess('You have successfully logged out!')
//   store.user = {}
//   $('.after-auth').hide()
//   $('.before-auth').show()
// }
//
// const onCreateGameFailure = () => {
//   onFailure('Hmmm.. something went wrong. Try again.')
// }

module.exports = {
  onSuccess,
  onFailure,
  onPlayerMove,
  onGetTotalGames
}
