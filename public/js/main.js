import * as helpers from "/js/helpers.js";
import Character from "/js/Character.js";
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
    helpers.loadCharacterTexture(tiles),
    helpers.loadBackgroundTextures(tiles),
    helpers.loadLevel('level-1')
]).then(([characterSprite, textures, level]) => {
    const game = new Game();
    const backgroundLayer = createBackground(level.backgrounds, backgroundBuffer, tiles);
    game.layers.push(backgroundLayer);

    //create character, then set the starting positions.
    const character = new Character();
    character.addTrait(new Velocity());
    const gravity = 1900;

    //set character starting position, and initial velocity.
    character.position.set(64, 180);
    character.velocity.set(200, -600);

    input.addMapping(SPACEBAR, keyState => {
        if(keyState) {
            character.jump.start();
        } else {
            character.jump.cancel();
        }
    });

    context.drawImage(backgroundBuffer, 0, 0);
    const spriteLayer = createSprite(character, tiles);
    game.layers.push(spriteLayer);

    //create time object, pass through deltatime constant
    const timer = new Timer(1/60);

    //updates game state using the timer update function.
    timer.update = function update(deltaTime) { 
        character.update(deltaTime);
        game.draw(context);
        character.velocity.y += gravity * deltaTime;
    }
    timer.start();
});
