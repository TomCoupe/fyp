import Compositor from './Compositor.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders.js';
import { createCharacter } from './entities.js';
import { loadBackgroundSprites } from './sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';

import Keyboard from './KeyboardState.js';


const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

context.scale(2, 2);

Promise.all([
    createCharacter(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
    .then(([character, backgroundSprites, level]) => {
        const comp = new Compositor();

        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        comp.layers.push(backgroundLayer);

        const gravity = 2000;
        character.pos.set(64, 180);
        // mario.vel.set(200, -600)


        const SPACE = 32;
        const input = new Keyboard();
        input.addMapping(SPACE, keyState => {
            if (keyState) {
                character.jump.start();
            } else {
                character.jump.cancel();
            }
        });
        input.listenTo(window);


        const spriteLayer = createSpriteLayer(character);
        comp.layers.push(spriteLayer);

        const timer = new Timer(1 / 60);
        timer.update = function update(deltaTime) {
            character.update(deltaTime);

            comp.draw(context);

            character.vel.y += gravity * deltaTime;
        }

        timer.start();
    });