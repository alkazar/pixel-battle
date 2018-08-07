// private
let P8_PG
const P8_FONT_FACE = 'pixelsix14'
const P8_FONT_SIZE = 8
const P8_FONT      = P8_FONT_SIZE + 'px ' + P8_FONT_FACE

const P8_SPRITE_SIZE = 8

const P8_COLOURS = [
  '#000000',
  '#1D2B53',
  '#7E2553',
  '#008751',
  '#AB5236',
  '#5F574F',
  '#C2C3C7',
  '#FFF1E8',
  '#FF004D',
  '#FFA300',
  '#FFEC27',
  '#00E436',
  '#29ADFF',
  '#83769C',
  '#FF77AB',
  '#FFCCAA'
]

let P8_BUTTONS     = [[], []]
let P8_accruedTime = 0

function P8_resetButtonState() {
  P8_BUTTONS = [[], []]
}

P8_PG = playground({
  width     : 256,
  height    : 144,
  smoothing : false,

  create : function() {
    P8_PG.loadImage('sprite')
    P8_PG.loadFont(P8_FONT_FACE)

    _init()
  },

  step : function(dt) {
    P8_accruedTime += dt

    const count = Math.floor(P8_accruedTime * 30)
    P8_accruedTime = P8_accruedTime - count / 30
    for (let i = 0; i < count; i++) {
      _update()
      P8_resetButtonState()
    }
  },

  render : () => _draw(),

  keydown : function(event) {
    // player 1
    if (event.key === 'a') P8_BUTTONS[0][0] = true
    if (event.key === 'd') P8_BUTTONS[0][1] = true
    if (event.key === 'w') P8_BUTTONS[0][2] = true
    if (event.key === 's') P8_BUTTONS[0][3] = true
    if (event.key === '3') P8_BUTTONS[0][4] = true
    if (event.key === '4') P8_BUTTONS[0][5] = true

    // player 2
    if (event.key === 'j') P8_BUTTONS[1][0] = true
    if (event.key === 'l') P8_BUTTONS[1][1] = true
    if (event.key === 'i') P8_BUTTONS[1][2] = true
    if (event.key === 'k') P8_BUTTONS[1][3] = true
    if (event.key === '9') P8_BUTTONS[1][4] = true
    if (event.key === '0') P8_BUTTONS[1][5] = true
  },

  keyup : function(event) {
    // player 1
    if (event.key === 'a') P8_BUTTONS[0][0] = false
    if (event.key === 'd') P8_BUTTONS[0][1] = false
    if (event.key === 'w') P8_BUTTONS[0][2] = false
    if (event.key === 's') P8_BUTTONS[0][3] = false
    if (event.key === '3') P8_BUTTONS[0][4] = false
    if (event.key === '4') P8_BUTTONS[0][5] = false

    // player 2
    if (event.key === 'j') P8_BUTTONS[1][0] = false
    if (event.key === 'l') P8_BUTTONS[1][1] = false
    if (event.key === 'i') P8_BUTTONS[1][2] = false
    if (event.key === 'k') P8_BUTTONS[1][3] = false
    if (event.key === '9') P8_BUTTONS[1][4] = false
    if (event.key === '0') P8_BUTTONS[1][5] = false
  }
})

// public
const BLACK       = 0
const DARK_BLUE   = 1
const DARK_PURPLE = 2
const DARK_GREEN  = 3
const BROWN       = 4
const DARK_GRAY   = 5
const LIGHT_GRAY  = 6
const WHITE       = 7
const RED         = 8
const ORANGE      = 9
const YELLOW      = 10
const GREEN       = 11
const BLUE        = 12
const INDIGO      = 13
const PINK        = 14
const PEACH       = 15

const BTN_LEFT  = 0
const BTN_RIGHT = 1
const BTN_UP    = 2
const BTN_DOWN  = 3
const BTN_A     = 4
const BTN_B     = 5

function print(text, x, y, colour) {
  P8_PG.layer.fillStyle(P8_COLOURS[colour])
  P8_PG.layer.font(P8_FONT)
  P8_PG.layer.fillText(text, x, y)
}

function spr(spriteNum, dx, dy) {
  const cw = P8_PG.images.sprite.width / P8_SPRITE_SIZE
  const cx = spriteNum % cw
  const cy = Math.floor(spriteNum / cw)

  P8_PG.layer.drawImage(
    P8_PG.images.sprite,
    cx * P8_SPRITE_SIZE,
    cy * P8_SPRITE_SIZE,
    P8_SPRITE_SIZE,
    P8_SPRITE_SIZE,
    dx,
    dy,
    P8_SPRITE_SIZE,
    P8_SPRITE_SIZE
  )
}

function cls(colour) {
  P8_PG.layer.clear(P8_COLOURS[colour])
}

function rectfill(x, y, width, height, colour) {
  P8_PG.layer.fillStyle(P8_COLOURS[colour])
  P8_PG.layer.fillRect(x, y, width, height, colour)
}

function btnp(buttonNum, playerNum) {
  return P8_BUTTONS[playerNum][buttonNum]
}
