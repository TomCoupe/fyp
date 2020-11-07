import { loadImage, draw, define, loadLevel, drawTile, drawBackground, loadBackgroundTextures } from "/js/helpers.js";

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const tiles = new Map();


Promise.all([
    loadBackgroundTextures(tiles),
    loadLevel('level-1')
]).then(([textures, level]) => {
    level.backgrounds.forEach(background => {
        drawBackground(background, context, tiles, 16, 16);
    });
});
