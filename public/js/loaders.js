import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import Level from './Level.js';
import { loadBackgroundSprites } from './sprites.js';

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

export function createTiles(level, backgrounds) {
    //looping through each individual tile and adding it to the tile matrix
    backgrounds.forEach(background => {
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; ++x) {
                for (let y = y1; y < y2; ++y) {
                    level.tileMatrix.set(x, y, {
                        name: background.tile,
                    })
                }
            }
        });
    })
}

export function loadLevel(name) {
    return Promise.all([
        fetch(`/levels/${name}.json`).then(r => r.json()),
        loadBackgroundSprites()
    ]).then(([levelSpec, backgroundSprite]) => {
        const level = new Level();
        createTiles(level, levelSpec.backgrounds);

        const backgroundLayer = createBackgroundLayer(level, backgroundSprite);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);
        // console.table(level.tileMatrix.grid);
        return level;
    })
}
