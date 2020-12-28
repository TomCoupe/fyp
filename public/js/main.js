import * as helpers from "/js/helpers.js";
import Character from "/js/Character.js";
import {createBackground, createSprite} from "/js/layers.js"
import Game from "./Game.js";

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

context.scale(2, 2);

const backgroundBuffer = document.createElement('canvas');
const tiles = new Map();
const gravity = 0.5;

Promise.all([
    helpers.loadCharacterTexture(tiles),
    // helpers.loadBackgroundTextures(tiles),
    helpers.loadLevel('level-1')
]).then(([characterSprite, textures, level]) => {
    const game = new Game();
    // const backgroundLayer = createBackground(level.backgrounds, backgroundBuffer, tiles);
    // game.layers.push(backgroundLayer);


    //create character, then set the starting positions.
    const character = new Character();
    character.position.set(64, 180);
    character.velocity.set(2, -10);

    context.drawImage(backgroundBuffer,0 ,0);
    const spriteLayer = createSprite(character, tiles);
    game.layers.push(spriteLayer);

    function update() { 
        game.draw(context);

        // helpers.draw('idle', context, character.position.x, character.position.y, tiles);

        // character.draw(context, tiles);
        character.updateCharacter();
        character.velocity.y += gravity;

        requestAnimationFrame(update);
    }
    update();
});
