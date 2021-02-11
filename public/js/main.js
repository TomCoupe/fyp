
import Timer from './Timer.js';
import Screen from './Screen.js';
import { loadLevel } from './loaders.js';
import { createCharacter } from './entities.js';
import { watchKeyBoard } from './KeyboardState.js';
import { createCollisionLayer } from './layers.js'


const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

// context.scale(2.5, 2.5);

Promise.all([
    createCharacter(),
    loadLevel('1-1'),
]).then(([character, level]) => {
    const gravity = 2000;

    const screen = new Screen();

    character.pos.set(64, 64);

    
    level.game.layers.push(createCollisionLayer(level));

    level.entities.add(character);

    watchKeyBoard(character);

    //debugging code (allows me to move via)
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if(event.buttons === 1) {
                character.vel.set(0, 0);
                character.pos.set(event.offsetX, event.offsetY);

            }
        });
    });

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        level.game.draw(context, screen);

        character.vel.y += gravity * deltaTime;
    }

    timer.start();
});
