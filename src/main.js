let MENU_TEXT_COLOUR = P8.PEACH
let DISABLED_MENU_TEXT_COLOUR = P8.DARK_GRAY
let STATUS_TEXT_COLOUR = P8.ORANGE
let MAX_COOLDOWN = 5

class Player {
  constructor(x, y, img, colour) {
    this.x = x
    this.y = y
    this.img = img
    this.colour = colour
    this.dead = false
    this.cooldown = MAX_COOLDOWN
    this.selectedActionIndex = 0
    this.health = 120
    this.energy = 0
    this.ready = false
    this.actions = [
        { name : 'Normal', selfEnergy : -1, enemyHealth : -10 },
        { name : 'Super', selfEnergy : -2, enemyHealth : -30 },
        { name : 'Ultra', selfEnergy : -5, enemyHealth : -100 },
        { name : 'Powerup', selfHealth : -20, selfEnergy : 1 },
        { name : 'Heal', selfEnergy : -1, selfHealth : 30 },
        { name : 'Steal', selfHealth : -30, enemyEnergy : -1, selfEnergy : 1 },
        { name : 'Super Steal', selfHealth : -50, enemyEnergy : -2, selfEnergy : 2 },
        { name : 'Wait' },
    ]
  }

  startTurn() {
    this.selectedActionIndex = 0
    this.energy += 1
  }

  isActionAllowed(enemy, action) {
    if ('selfEnergy' in action && this.energy < -action.selfEnergy)
      return false
  
    if ('enemyEnergy' in action && enemy.energy < -action.enemyEnergy)
      return false
  
    return true
  }
  
  endTurn(enemy, action) {
    if (this.dead === true)
      return
  
    action = this.actions[this.selectedActionIndex]
  
    if (!this.isActionAllowed(enemy, action) || !this.ready)
      return
  
    if ('selfEnergy' in action)
      this.energy += action.selfEnergy
    if ('enemyEnergy' in action)
      enemy.energy += action.enemyEnergy
    if ('selfHealth' in action)
      this.health += action.selfHealth
    if ('enemyHealth' in action)
      enemy.health += action.enemyHealth
  
    if (this.health < 0)
      this.health = 0
  
    if (enemy.health < 0)
      enemy.health = 0
  
    this.ready = false
    this.cooldown = MAX_COOLDOWN
  }
  
  drawHintText(enemy, attribute) {
    let offset = attribute === 'Health' ? 0 : 8
    let selfAttrib = 'self' + attribute
    let enemyAttrib = 'enemy' + attribute
    let selfAction = this.actions[this.selectedActionIndex]
    let enemyAction = enemy.actions[enemy.selectedActionIndex]
  
    if (selfAttrib in selfAction && this.ready && !this.dead) {
      let plus = selfAction[selfAttrib] > 0
      P8.print((plus ? '+' : '') + selfAction[selfAttrib], this.x + 60, this.y + offset, this.colour)
    }
  
    if (enemyAttrib in enemyAction && enemy.ready && !enemy.dead) {
      let plus = enemyAction[enemyAttrib] > 0
      P8.print((plus ? '+' : '') + enemyAction[enemyAttrib], this.x + 80, this.y + offset,  enemy.colour)
    }
  }
 
  draw(enemy) {
    // player status
    P8.print('Health : ' + this.health, this.x, this.y, STATUS_TEXT_COLOUR)
    P8.print('Energy : ' + this.energy, this.x, this.y + 8, STATUS_TEXT_COLOUR)
  
    this.drawHintText(enemy, 'Health')
    this.drawHintText(enemy, 'Energy')
  
    // player graphic
    P8.spr(this.img, this.x + 50, this.y + 30)
  
    if (this.dead)
      P8.print('xx DEAD xx', this.x + 35, this.y + 20, this.colour)
  
    // cooldown bar
    if (this.cooldown > 0) {
      P8.rectfill(this.x + 50, this.y + 80, this.cooldown/MAX_COOLDOWN * 30, 8, this.colour);
      return
    }
  
    // player menu
    for(let i = 0; i < this.actions.length; i++) {
      let colour = MENU_TEXT_COLOUR
  
      if (i === this.selectedActionIndex && !this.dead) {
        if (this.isActionAllowed(enemy, this.actions[i]))
          colour = this.colour
        else
          colour = DISABLED_MENU_TEXT_COLOUR
      }
  
      P8.print(this.actions[i].name, this.x, this.y + 60 + 8 * i, colour)
    }
  }
  
  update(dt) {
    if (this.cooldown > 0 && !this.dead)
      this.cooldown -= 1 * dt
  
    if (this.cooldown < 0)
      this.cooldown = 0
  
    if (this.ready === false && this.cooldown === 0) {
      this.ready = true
      this.startTurn()
    }
  
    if (this.health === 0)
      this.dead = true
  }
  
  up() {
    this.selectedActionIndex = this.selectedActionIndex - 1

    if (this.selectedActionIndex < 0)
      this.selectedActionIndex = this.actions.length - 1
  }
  
  down() {
    this.selectedActionIndex = (this.selectedActionIndex + 1) % this.actions.length
  }
}

let app = playground({
  width     : 240,
  height    : 135,
  smoothing : false,

  create: function() {
    P8.init(this, {
      images : [ 'monster1', 'monster2' ],
    })

    this.player1 = new Player(10, 10, 'monster1', P8.BROWN)
    this.player2 = new Player(140, 10, 'monster2', P8.RED)
  },

  step: function(dt) {
    this.player1.update(dt)
    this.player2.update(dt)
  },

  keydown: function(event) {
    // player 1 controls
    if (event.key === 'w') this.player1.up()
    if (event.key === 's') this.player1.down()
    if (event.key === 'space') this.player1.endTurn(this.player2)

    // player 2 controls
    if (event.key === 'up') this.player2.up()
    if (event.key === 'down') this.player2.down()
    if (event.key === 'enter') this.player2.endTurn(this.player1)
  },

  render: function() {
    P8.cls(P8.BLACK)
    this.player1.draw(this.player2)
    this.player2.draw(this.player1)
  }
});
