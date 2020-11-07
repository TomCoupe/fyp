import * as helpers from "/js/helpers.js";

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const tiles = new Map();


Promise.all([
    helpers.loadBackgroundTextures(tiles),
    helpers.loadLevel('level-1')
]).then(([textures, level]) => {
    level.backgrounds.forEach(background => {
        helpers.drawBackground(background, context, tiles, 16, 16);
    });
});
