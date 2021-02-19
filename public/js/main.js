
import Timer from './Timer.js';
import Screen from './Screen.js';
import { loadLevel } from './loaders.js';
import { createCharacter, createEnemy1 } from './entities.js';
import { watchKeyBoard } from './KeyboardState.js';
import { createCollisionLayer, createScreenLayer} from './layers.js'


const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

context.scale(2.5, 2.5);

Promise.all([
    createCharacter(),
    createEnemy1(),
    loadLevel('1-1'),
]).then(([character, enemy1, level]) => {   
    const gravity = 2000;
    const screen = new Screen();

    enemy1.pos.set(192, 160);

    character.playerReset();

    level.game.layers.push(createCollisionLayer(level), createScreenLayer(screen));
    level.entities.add(enemy1);
    level.entities.add(character);

    watchKeyBoard(character);

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime, screen);

        if(character.pos.x > 100) {
            screen.position.x = character.pos.x - 100;
        }

        level.game.draw(context, screen);
        console.log(Math.floor(enemy1.pos.x));
        if(Math.floor(enemy1.pos.x) === Math.floor(character.pos.x) && Math.floor(enemy1.pos.y) === Math.floor(character.pos.y)){
            character.pos.set(64, 64);
            screen.position.set(0, 0);
        }

        character.vel.y += gravity * deltaTime;
    }

    timer.start();
});

