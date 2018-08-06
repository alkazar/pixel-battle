
function _init() {
  this.player1 = new Player(10,  10, 0, BROWN)
  this.player2 = new Player(140, 10, 1, RED)
}

function _update() {
  // player 1 controls
  if (btnp(BTN_UP, 0)) this.player1.up()
  if (btnp(BTN_DOWN, 0)) this.player1.down()
  if (btnp(BTN_A, 0) || btnp(BTN_B, 0)) this.player1.endTurn(this.player2)

  // player 2 controls
  if (btnp(BTN_UP, 1)) this.player2.up()
  if (btnp(BTN_DOWN, 1)) this.player2.down()
  if (btnp(BTN_A, 1) || btnp(BTN_B, 1)) this.player2.endTurn(this.player1)

  this.player1.update()
  this.player2.update()
}

function _draw() {
  cls(BLACK)

  this.player1.draw(this.player2)
  this.player2.draw(this.player1)
}
