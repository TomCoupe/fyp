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

export function loadLevel(name) {
    return Promise.all([
        fetch(`/levels/${name}.json`).then(r => r.json()),
        loadBackgroundSprites()
    ]).then(([levelSpec, backgroundSprite]) => {
        const level = new Level();

        const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds, backgroundSprite);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    })
}
