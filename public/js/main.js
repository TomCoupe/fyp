import * as helpers from "/js/helpers.js";
import {createBackground, createSprite} from "/js/layers.js"
import Game from "./Game.js";

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

context.scale(2, 2);

const backgroundBuffer = document.createElement('canvas');
const tiles = new Map();


Promise.all([
    helpers.loadCharacterTexture(tiles),
    helpers.loadBackgroundTextures(tiles),
    helpers.loadLevel('level-1')
]).then(([characterSprite, textures, level]) => {
    const game = new Game();
    const backgroundLayer = createBackground(level.backgrounds, backgroundBuffer, tiles);
    game.layers.push(backgroundLayer);

    const position = {
        x: 64,
        y: 64
    }

    const spriteLayer = createSprite(position, tiles);
    game.layers.push(spriteLayer);

    function update() {
        game.draw(context);
        context.drawImage(backgroundBuffer,0 ,0);
        helpers.draw('idle', context, position.x, position.y, tiles);
        position.x += 2;
        position.y += 2;

        requestAnimationFrame(update);
    }
    update();
});
