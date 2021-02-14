import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import Level from './Level.js';
import SpriteSheet from './SpriteSheet.js';

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

function loadJSON(path) {
    return fetch(path).then(r => r.json())
}

export function loadSpriteSheet(name) {

    return loadJSON('/sprites/' + name + '.json').then(spriteSheet => Promise.all([
        spriteSheet,
        loadImage(spriteSheet.imagePath)
    ])).then(([spriteSheet, image]) => {
        console.log(spriteSheet)
        const sprites = new SpriteSheet(image, spriteSheet.tileWidth, spriteSheet.tileHeight)

        if (spriteSheet.tiles) {
            spriteSheet.tiles.forEach(tile => {
                sprites.defineTile(tile.name, tile.index[0], tile.index[1])
            })
        }

        if (spriteSheet.frames) {
            spriteSheet.frames.forEach(frame => {
                sprites.define(frame.name, frame.rect[0], frame.rect[1], frame.rect[2], frame.rect[3]);
            })
        }
        return sprites;
    })
}

export function createTiles(level, backgrounds) {

    function applyRange(background, xPos, xLen, yPos, yLen) {
        for (let x = xPos; x < xPos + xLen; ++x) {
            for (let y = yPos; y < yPos + yLen; ++y) {
                level.tileMatrix.set(x, y, {
                    name: background.tile,
                    type: background.type
                })
            }
        }
    }
    //looping through each individual tile and adding it to the tile matrix
    backgrounds.forEach(background => {
        background.ranges.forEach(range => {
            if (range.length === 4) {
                const [xPos, xLen, yPos, yLen] = range;
                applyRange(background, xPos, xLen, yPos, yLen)
            }
            if (range.length === 3) {
                const [xPos, xLen, yPos] = range;
                applyRange(background, xPos, xLen, yPos, 1)
            }
            if (range.length === 2) {
                const [xPos, yPos] = range;
                applyRange(background, xPos, 1, yPos, 1)
            }
        });
    })
}


export function loadLevel(name) {
    return Promise.all([
        loadJSON(`/levels/${name}.json`),
        loadSpriteSheet('1-1')
    ]).then(([levelSpec, backgroundSprite]) => {
        console.log(backgroundSprite);
        const level = new Level();
        createTiles(level, levelSpec.backgrounds);

        const backgroundLayer = createBackgroundLayer(level, backgroundSprite);
        level.game.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.game.layers.push(spriteLayer);

        return level;
    })
}
