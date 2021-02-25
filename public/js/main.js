
import Timer from './Timer.js';
import Screen from './Screen.js';
import { loadLevel } from './loaders.js';
import { createCharacter, createEnemy1, createEnemy2 } from './entities.js';
import { watchKeyBoard } from './KeyboardState.js';
import { createCollisionLayer, createScreenLayer } from './layers.js'
import LevelHandler from './LevelHandler.js';


const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const LEVEL1 = '1-1';
const LEVEL2 = '1-2';
const LEVEL3 = '1-3';

var currentLevel = 1;

context.scale(2.5, 2.5);

const levelHandler = new LevelHandler();


if (currentLevel == 1) {
    level1();
} else if (currentLevel == 2) {
    level2();
}


function level1() {
    Promise.all([
        createCharacter(),
        createEnemy1(),
        createEnemy2(),
        createEnemy2(),
        loadLevel(LEVEL1)
    ]).then(([character, enemy1, enemy2, enemy3, level]) => {
        const gravity = 2000;
        const screen = new Screen();

        enemy1.pos.set(192, 160);
        enemy2.pos.set(1362, 176);
        enemy3.pos.set(1250, 96);

        character.playerReset();

        character.pos.set(1350, 170)

        level.game.layers.push(createCollisionLayer(level), createScreenLayer(screen));
        level.entities.add(enemy1);
        level.entities.add(enemy2);
        level.entities.add(enemy3);
        level.entities.add(character);

        watchKeyBoard(character);

        const timer = new Timer(1 / 60);
        timer.update = function update(deltaTime) {
            if (currentLevel == 1) {
                level.update(deltaTime, screen, levelHandler);

                if (character.pos.x > 100) {
                    screen.position.x = character.pos.x - 100;
                }

                level.game.draw(context, screen);

                if (Math.round(enemy1.pos.x) === Math.round(character.pos.x) && Math.round(enemy1.pos.y) === Math.round(character.pos.y)) {
                    character.pos.set(64, 64);
                    screen.position.set(0, 0);
                }

                character.vel.y += gravity * deltaTime;

                if (Math.floor(character.pos.x) == 1407 && Math.floor(character.pos.y) == 176) {
                    timer.stop();
                    currentLevel = 2;
                    level2();
                    return;
                }
            }
        }
        timer.start();
    });
}

function level2() {
    Promise.all([
        createCharacter(),
        loadLevel(LEVEL2)
    ]).then(([character, level]) => {
        const gravity = 2000;
        const screen = new Screen();

        character.playerReset();

        if (!Window.event) {
            watchKeyBoard(character);
        }

        console.log(character.vel.x);

        level.game.layers.push(createCollisionLayer(level), createScreenLayer(screen));

        level.entities.add(character);

        const timer = new Timer(1 / 60);
        timer.update = function update(deltaTime) {
            if (currentLevel == 2) {
                level.update(deltaTime, screen);    

                if (character.pos.x > 100) {
                    screen.position.x = character.pos.x - 100;
                }

                level.game.draw(context, screen);

                character.vel.y += gravity * deltaTime;
            }
        }

        timer.start();
    });
}

