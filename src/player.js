let MENU_TEXT_COLOUR          = PEACH
let DISABLED_MENU_TEXT_COLOUR = DARK_GRAY
let STATUS_TEXT_COLOUR        = BLUE
let MAX_COOLDOWN              = 5 * 30 // 5 seconds

class Player {
  constructor(x, y, spriteNum, colour) {
    this.x = x
    this.y = y
    this.spriteNum = spriteNum
    this.colour = colour
    this.dead = false
    this.cooldown = MAX_COOLDOWN
    this.selectedActionIndex = 0
    this.health = 120
    this.energy = 0
    this.ready = false
    this.actions = [
        { name : 'Normal Attack', selfEnergy : -1, enemyHealth : -10 },
        { name : 'Super Attack', selfEnergy : -2, enemyHealth : -30 },
        { name : 'Ultra Attack', selfEnergy : -5, enemyHealth : -100 },
        { name : 'Powerup', selfHealth : -20, selfEnergy : 1 },
        { name : 'Heal', selfEnergy : -1, selfHealth : 30 },
        { name : 'Energy Steal', selfHealth : -30, enemyEnergy : -1, selfEnergy : 1 },
        { name : 'Double Energy Steal', selfHealth : -50, enemyEnergy : -2, selfEnergy : 2 },
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
      print((plus ? '+' : '') + selfAction[selfAttrib], this.x + 60, this.y + offset, this.colour)
    }

    if (enemyAttrib in enemyAction && enemy.ready && !enemy.dead) {
      let plus = enemyAction[enemyAttrib] > 0
      print((plus ? '+' : '') + enemyAction[enemyAttrib], this.x + 80, this.y + offset,  enemy.colour)
    }
  }

  draw(enemy) {
    // player status
    print('Health : ' + this.health, this.x, this.y, STATUS_TEXT_COLOUR)
    print('Energy : ' + this.energy, this.x, this.y + 8, STATUS_TEXT_COLOUR)

    this.drawHintText(enemy, 'Health')
    this.drawHintText(enemy, 'Energy')

    // player sprite
    spr(this.spriteNum, this.x + 50, this.y + 30)

    if (this.dead)
      print('xx DEAD xx', this.x + 35, this.y + 20, this.colour)

    // cooldown bar
    if (this.cooldown > 0) {
      rectfill(this.x + 50, this.y + 80, this.cooldown/MAX_COOLDOWN * 30, 8, this.colour);
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

      print(this.actions[i].name, this.x, this.y + 60 + 8 * i, colour)
    }
  }

  update() {
    if (this.cooldown > 0 && !this.dead)
      this.cooldown -= 1

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
