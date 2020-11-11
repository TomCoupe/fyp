import { drawBackground, draw } from '/js/helpers.js';

//function to take values from level json file and apply background tiles to the buffer.
export function createBackground(backgrounds, buffer, tiles) {
    buffer.width = 256;
    buffer.height = 240;

    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), tiles, 16, 16);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    }
}

//function to take a position attribute and apply a sprite object to that position.
export function createSprite(position, tiles) {
    return function drawSpriteLayer(context) {
        draw('idle', context, position.x, position.y, tiles)
    }
}