
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

        // console.log(character.pos.x, character.pos.y)

        if(character.pos.x > 100) {
            screen.position.x = character.pos.x - 100;
        }

        level.game.draw(context, screen);

        character.vel.y += gravity * deltaTime;
    }

    timer.start();
});

