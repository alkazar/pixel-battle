// private
let P8_PG
const P8_FONT_FACE = 'pixelsix14'
const P8_FONT_SIZE = 8
const P8_FONT      = P8_FONT_SIZE + 'px ' + P8_FONT_FACE

const P8 = {
  // public
  BLACK       : '#000000',
  DARK_BLUE   : '#1D2B53',
  DARK_PURPLE : '#7E2553',
  DARK_GREEN  : '#008751',
  BROWN       : '#AB5236',
  DARK_GRAY   : '#5F574F',
  LIGHT_GRAY  : '#C2C3C7',
  WHITE       : '#FFF1E8',
  RED         : '#FF004D',
  ORANGE      : '#FFA300',
  YELLOW      : '#FFEC27',
  GREEN       : '#00E436',
  BLUE        : '#29ADFF',
  INDIGO      : '#83769C',
  PINK        : '#FF77AB',
  PEACH       : '#FFCCAA',

  run : function(content) {
    P8_PG = playground({
      width     : 256,
      height    : 144,
      smoothing : false,

      create : function() {
        P8_PG.loadFont(P8_FONT_FACE)

        for(let i = 0; i < content.images.length; i++) {
          P8_PG.loadImage(content.images[i])
        }

        content.init()
      },

      step    : (dt) => content.step(dt),
      keydown : (event) => content.keydown(event),
      render  : () => content.render(),
    })
  },

  print : function(text, x, y, colour) {
    P8_PG.layer.fillStyle(colour)
    P8_PG.layer.font(P8_FONT)
    P8_PG.layer.fillText(text, x, y)
  },

  spr : function(imgName, x, y) {
    P8_PG.layer.drawImage(P8_PG.images[imgName], x, y)
  },

  cls : function(colour) {
    P8_PG.layer.clear(colour)
  },

  rectfill : function(x, y, width, height, colour) {
    P8_PG.layer.fillStyle(colour)
    P8_PG.layer.fillRect(x, y, width, height, colour)
  }
}
