
import Timer from './Timer.js';
import Screen from './Screen.js';
import { loadLevel } from './loaders.js';
import { createCharacter } from './entities.js';
import { watchKeyBoard } from './KeyboardState.js';
import { createCollisionLayer, createScreenLayer} from './layers.js'


const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

context.scale(2.5, 2.5);

Promise.all([
    createCharacter(),
    loadLevel('1-1'),
]).then(([character, level]) => {
    const gravity = 2000;
    const screen = new Screen();

    character.playerReset();
    level.game.layers.push(createCollisionLayer(level), createScreenLayer(screen));
    level.entities.add(character);

    watchKeyBoard(character);

    //debugging code (allows me to move via)
    
    // mouseTester(character, screen);

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime, screen);

        if(character.pos.x > 100) {
            screen.position.x = character.pos.x - 100;
        }

        level.game.draw(context, screen);

        character.vel.y += gravity * deltaTime;
    }

    timer.start();
});

// function mouseTester(character, screen) {
//     ['mousedown', 'mousemove'].forEach(eventName => {
//         let lastEvent;
//         canvas.addEventListener(eventName, event => {
//             if(event.buttons === 1) {
//                 character.vel.set(0, 0);
//                 character.pos.set(event.offsetX + screen.position.x, event.offsetY + screen.position.y);

//             } else if (event.buttons === 2 && lastEvent && lastEvent.buttons === 2 && lastEvent.type === 'mousemove') {
//                 screen.position.x -= event.offsetX - lastEvent.offsetX;
//             }
//             lastEvent = event;
//         });
//         canvas.addEventListener('contextmenu', event => {
//             event.preventDefault();
//         })
//     });
// }
