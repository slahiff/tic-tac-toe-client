# Tic-Tac-Toe

### Overview
Tic-Tac-Toe is a 2 player game in which both players duel to see who can match three symbols in a row. The game supports two players to play mutliple games of tic-tac-toe by switching off taking turns.

### Development
I started this project by first creating the gameboard primarly by using a bootstrap column layout. Then I proceeded to add in the user authentication APIs as well as game logic. Lastly, I hooked up the game to an API.

### Technologies Used:
- HTML
- SCSS
- Bootstrap
- JavaScript
- Ajax
- Jquery

### User Stories:

**GAMEPLAY REQUIREMENTS**:
- As a user of the Tic-Tac-Toe game I want to be able to play a 2-player game that features player 1 and player 2 alternating turns.
- Player 1 should always be represented by the 'X' value on the game board and player 2 should always be represented by 'O' on the game board.
- Print game result to the UI once either player 1 has won, player 2 has won, or the game ended in a draw.
- After a game has finished I should be able to initiate a new game.
- Prior game results or a results tally should be accessible via a button or shown somewhere on the page.
- As a user I want to receive confirmation/feedback in the UI after each move that happens in the game (and ultimately the end result of the game).

**AUTHENTICATION REQUIREMENTS**:
- To access the game board and begin a game, the user first must create login credentials (email address, password, confirm password)
- After a user has created login credentials - they should be able to sign into the app and initiate a game.
- Users should also be able to log out of their session by clicking a "Sign Out" button.
- As a user I also need the ability to change my password.
- The sign up and sign in fields should only be visible to users who are not logged in.
- Change password and log out should only be visible to the user when logged in.

### Wireframes:
[Before Authentication Wireframe 1](https://i.imgur.com/zW1IFS8.jpg)
[After Authentication Wireframe 2](https://i.imgur.com/oTr9es6.jpg)
