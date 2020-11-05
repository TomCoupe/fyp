import { loadImage, draw, define, loadLevel, drawTile, drawBackground } from "/js/helpers.js";

const canvas = document.getElementById('game');
const context = canvas.getContext('2d'); 
const tiles = new Map();

loadImage('/images/game/tiles.png').then(image => {
    define('ground', 0, 0, 16, 16, image, tiles);
    define('sky', 3, 23, 16, 16, image, tiles);
    draw('ground', context, 45, 62, tiles);

    loadLevel('level-1')
    .then(level => {
        level.backgrounds.forEach(background => {
            drawBackground(background, context, tiles, 16, 16);
        })
        
    })
})