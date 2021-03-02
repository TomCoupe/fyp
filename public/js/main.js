
import Timer from './Timer.js';
import Screen from './Screen.js';
// import axios from 'axios';
import { loadLevel } from './loaders.js';
import { createCharacter, createEnemy1, createEnemy2, createEnemy3 } from './entities.js';
import { watchKeyBoard } from './KeyboardState.js';
import { createCollisionLayer, createScreenLayer, createTime } from './layers.js';
import { checkCollision, checkWinBlock } from './LevelHelpers.js';

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const LEVEL1 = '1-1';
const LEVEL2 = '1-2';
const LEVEL3 = '1-3';

// const axios = require("axios");

var currentLevel = 3;
var time = '';
var seconds = 0;
var mins = 0;
var currentTime = setInterval(updateTime, 1000);

function updateTime() {
    seconds = seconds + 1;
    if (seconds % 60 == 0) {
        mins = mins + 1;
        seconds = 0;
    }
    time = mins + 'm ' + seconds + 's';
}

function updateUI(context, screen, player) {
    //time
    context.font = '8px Comic Sans MS';
    context.fillStyle = 'red';
    context.fillText(time, screen.size.x - 252, screen.size.y - 210);

    //lives
    context.font = '8px Comic Sans MS';
    context.fillStyle = 'red';
    context.fillText(player.lives + ' Lives', screen.size.x - 252, screen.size.y - 200);

    //points
    context.font = '8px Comic Sans MS';
    context.fillStyle = 'red';
    context.fillText(0 + ' points', screen.size.x - 252, screen.size.y - 190);

}

context.scale(2.5, 2.5);

level3();

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

        character.pos.set(64, 64);

        level.game.layers.push(createCollisionLayer(level), createScreenLayer(screen));
        level.entities.add(enemy1);
        level.entities.add(enemy2);
        level.entities.add(enemy3);
        level.entities.add(character);

        watchKeyBoard(character);

        const timer = new Timer(1 / 60);
        timer.update = function update(deltaTime) {
            if (currentLevel == 1) {
                level.update(deltaTime, screen);

                // console.log(time);

                if (character.pos.x > 100) {
                    screen.position.x = character.pos.x - 100;
                }

                level.game.draw(context, screen);
                // createTime(time);
                updateUI(context, screen, character);

                // console.log(character.pos.x, character.pos.y);
                checkCollision(character, enemy1, screen);
                checkCollision(character, enemy2, screen);
                checkCollision(character, enemy3, screen);

                character.vel.y += gravity * deltaTime;

                if (checkWinBlock(1426, 160, character)) {
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
        createEnemy1(),
        createEnemy1(),
        createEnemy3(),
        loadLevel(LEVEL2)
    ]).then(([character, enemy1, enemy2, enemy3, level]) => {
        const gravity = 2000;
        const screen = new Screen();

        character.pos.set(64, 64);

        enemy1.pos.set(498, 144);
        enemy2.pos.set(464, 144);
        enemy3.pos.set(687, 128);

        if (!Window.event) {
            watchKeyBoard(character);
        }

        level.game.layers.push(createCollisionLayer(level), createScreenLayer(screen));

        level.entities.add(character);
        level.entities.add(enemy1);
        level.entities.add(enemy2);
        level.entities.add(enemy3);

        const timer = new Timer(1 / 60);
        timer.update = function update(deltaTime) {
            if (currentLevel == 2) {
                level.update(deltaTime, screen);

                if (character.pos.x > 100) {
                    screen.position.x = character.pos.x - 100;
                }

                level.game.draw(context, screen);

                console.log(character.pos.x, character.pos.y);

                updateUI(context, screen, character);

                checkCollision(character, enemy1, screen);
                checkCollision(character, enemy2, screen);

                if (checkWinBlock(1088, 96, character)) {
                    timer.stop();
                    currentLevel = 3;
                    level3();
                    return;
                }

                character.vel.y += gravity * deltaTime;
            }
        }

        timer.start();
    });
}

function level3() {
    Promise.all([
        createCharacter(),
        createEnemy3(),
        createEnemy3(),
        createEnemy2(),
        loadLevel(LEVEL3)
    ]).then(([character, enemy1, enemy2, enemy3, level]) => {
        const gravity = 2000;
        const screen = new Screen();

        character.pos.set(1077, 96);

        enemy1.pos.set(688, 144);
        enemy2.pos.set(767, 144);
        enemy3.pos.set(1218, 80);

        if (!Window.event) {
            watchKeyBoard(character);
        }

        level.game.layers.push(createCollisionLayer(level), createScreenLayer(screen));
        level.entities.add(character);
        level.entities.add(enemy1);
        level.entities.add(enemy2);
        level.entities.add(enemy3);

        const timer = new Timer(1 / 60);
        timer.update = function update(deltaTime) {
            if (currentLevel == 3) {
                level.update(deltaTime, screen);

                // console.log(character.pos.x, character.pos.y);

                if (character.pos.x > 100) {
                    screen.position.x = character.pos.x - 100;
                }

                level.game.draw(context, screen);

                updateUI(context, screen, character);
                console.log(character.pos.x, character.pos.y);
                checkCollision(character, enemy1, screen);
                checkCollision(character, enemy2, screen);
                checkCollision(character, enemy3, screen);

                // console.log(character.pos.x, character.pos.y);

                if (checkWinBlock(1266, 160, character)) {
                    gameComplete(character);
                    currentLevel = 4;
                    return;
                }

                character.vel.y += gravity * deltaTime;
            }
        }

        timer.start();
    });
}

function gameComplete(character) {
    listen();
    gameEnd(character);
    lastPageRestart();
    lastPageExit();
    //game needs to end here.
}
var rectExit = {
    x: 200,
    y: 125,
    width: 250, 
    heigth: 125
};

var rect = {
    x: 200,
    y: 275,
    width: 250, 
    heigth: 125
};

function lastPageRestart() {
    context.beginPath();
    context.rect(80, 110, 100, 50);
    context.fillStyle = '#7d7d7d';
    context.fillRect(80, 110, 100, 50);
    context.fill();
    context.closePath();
    context.font = '12px Comic Sans MS';
    context.fillStyle = 'white';
    context.fillText('Restart', 109, 139);
}

function lastPageExit() {
    context.beginPath();
    context.rect(80, 50, 100, 50);
    context.fillStyle = '#b85c5c';
    context.fillRect(80, 50, 100, 50);
    context.fill();
    context.closePath();
    context.font = '12px Comic Sans MS';
    context.fillStyle = 'white';
    context.fillText('Exit', 118, 80);
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();

    // console.log(event.clientX, event.clientY);
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.heigth && pos.y > rect.y
}

function listen() {
    canvas.addEventListener('click', function (evt) {
        var mousePos = getMousePos(canvas, evt);
        console.log(mousePos);
        if (isInside(mousePos, rect)) {
            window.location.href = '/game';
        } else if (isInside(mousePos, rectExit)) {
            window.location.href = '/home';
        } else {
            alert('clicked outside rect');
        }
    }, false);
}

function gameEnd(character) {

    let gameData = {
        points: character.points,
        lives: character.lives,
        time: time
    }

    //posting data to backend
    fetch('/game/post', {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            "content-type": "text/json"
        },
        body: JSON.stringify(gameData)
    }).then(function (response) {
        if (response.ok) {
            return gameData;
        }
        return Promise.reject(response);
    }).then(function (response) {
        console.log(response);
    }).catch(function (response) {
        console.log(response);
    })
}

