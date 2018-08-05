let PG
const FONT_FACE = 'pixelsix14'
const FONT_SIZE = 8
const FONT = FONT_SIZE + 'px ' + FONT_FACE

const P8 = {
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

  init : function(pg, resources) {
    PG = pg
   
    for(let i = 0; i < resources.images.length; i++) {
      PG.loadImage(resources.images[i])
    }

    PG.loadFont(FONT_FACE)
  },

  print : function(text, x, y, colour) {
    PG.layer.fillStyle(colour)
    PG.layer.font(FONT)
    PG.layer.fillText(text, x, y)
  },

  spr : function(imgName, x, y) {
    PG.layer.drawImage(PG.images[imgName], x, y)
  },

  cls : function(colour) {
    PG.layer.clear(colour)
  },

  rectfill : function(x, y, width, height, colour) {
    PG.layer.fillStyle(colour)
    PG.layer.fillRect(x, y, width, height, colour)
  }
}
