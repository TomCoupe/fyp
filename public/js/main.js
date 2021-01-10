import * as helpers from "/js/helpers.js";
// import Character from "/js/Character.js";
import {createCharacter} from "/js/characters.js";
import Timer from "/js/Timer.js";
import {createBackground, createSprite} from "/js/layers.js"
import Game from "./Game.js";

import KeyBoard from "./KeyBoard.js";

const input = new KeyBoard();
const SPACEBAR = 32;

input.listenTo(window);

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

context.scale(2, 2);

const backgroundBuffer = document.createElement('canvas');
const tiles = new Map();

Promise.all([
    createCharacter(),
    helpers.loadBackgroundTextures(tiles),
    helpers.loadLevel('level-1')
]).then(([characterSprite, textures, level]) => {

    console.log(characterSprite)
    const game = new Game();
    const backgroundLayer = createBackground(level.backgrounds, backgroundBuffer, tiles);
    game.layers.push(backgroundLayer);

    //create character, then set the starting positions.
    // const character = new Character();
    const gravity = 1900;

    //set character starting position
    characterSprite.position.set(64, 180);

    console.log(characterSprite.position);

    input.addMapping(SPACEBAR, keyState => {
        if(keyState) {
            characterSprite.jump.start();
        } else {
            characterSprite.jump.cancel();
        }
    });

    // console.log(characterSprite);

    context.drawImage(backgroundBuffer, 0, 0);
    const spriteLayer = createSprite(characterSprite, tiles);
    game.layers.push(spriteLayer);

    //create time object, pass through deltatime constant
    const timer = new Timer(1/60);

    //updates game state using the timer update function.
    timer.update = function update(deltaTime) { 
        characterSprite.update(deltaTime);
        game.draw(context);
        characterSprite.velocity.y += gravity * deltaTime;
    }
    timer.start();
});
