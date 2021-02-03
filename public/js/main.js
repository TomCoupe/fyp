import Compositor from './Compositor.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders.js';
import { createCharacter } from './entities.js';
import { loadBackgroundSprites } from './sprites.js';

import Keyboard from './KeyboardState.js';


const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

context.scale(2, 2);

Promise.all([
    createCharacter(),
    loadLevel('1-1'),
]).then(([character, level]) => {
    const gravity = 2000;
    character.pos.set(64, 64);

    level.entities.add(character);

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

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        level.comp.draw(context);

        character.vel.y += gravity * deltaTime;
    }

    timer.start();
});