P8.run({
  images : [ 'monster1', 'monster2' ],

  init : function() {
    this.player1 = new Player(10, 10, 'monster1', P8.BROWN)
    this.player2 = new Player(140, 10, 'monster2', P8.RED)
  },

  step : function(dt) {
    this.player1.update(dt)
    this.player2.update(dt)
  },

  keydown : function(event) {
    // player 1 controls
    if (event.key === 'w') this.player1.up()
    if (event.key === 's') this.player1.down()
    if (event.key === 'space') this.player1.endTurn(this.player2)

    // player 2 controls
    if (event.key === 'up') this.player2.up()
    if (event.key === 'down') this.player2.down()
    if (event.key === 'enter') this.player2.endTurn(this.player1)
  },

  render : function() {
    P8.cls(P8.BLACK)
    this.player1.draw(this.player2)
    this.player2.draw(this.player1)
  }
});
