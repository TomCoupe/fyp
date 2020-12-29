import * as helpers from "/js/helpers.js";
import Character from "/js/Character.js";
import Timer from "/js/Timer.js";
import {createBackground, createSprite} from "/js/layers.js"
import Game from "./Game.js";

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
    const gravity = 30;
    character.position.set(64, 180);
    character.velocity.set(200, -600);

    context.drawImage(backgroundBuffer,0 ,0);
    const spriteLayer = createSprite(character, tiles);
    game.layers.push(spriteLayer);

    const timer = new Timer(1/60);

    timer.update = function update(deltaTime) { 
        game.draw(context);
        character.updateCharacter(deltaTime);
        character.velocity.y += gravity;
    }
    timer.start();
});
