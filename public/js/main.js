import * as helpers from "/js/helpers.js";
import {createBackground, createSprite} from "/js/layers.js"
import Game from "./Game.js";

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

context.scale(2, 2);

const backgroundBuffer = document.createElement('canvas');
const tiles = new Map();
const gravity = 0.5;

class Vector{
    constructor(x, y) {
        this.set(x, y)
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Character {
    constructor() {
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
    }

    updateCharacter() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw(context, tiles) {
        draw('idle', context, this.position.x, this.position.y, tiles)
    }
}

Promise.all([
    helpers.loadCharacterTexture(tiles),
    helpers.loadBackgroundTextures(tiles),
    helpers.loadLevel('level-1')
]).then(([characterSprite, textures, level]) => {
    const game = new Game();
    const backgroundLayer = createBackground(level.backgrounds, backgroundBuffer, tiles);
    game.layers.push(backgroundLayer);

    const character = new Character();
    character.position.set(64, 180);
    character.velocity.set(2, -10);

    const spriteLayer = createSprite(character, tiles);
    game.layers.push(spriteLayer);

    function update() { 
        game.draw(context);
        context.drawImage(backgroundBuffer,0 ,0);
        helpers.draw('idle', context, character.position.x, character.position.y, tiles);

        character.updateCharacter();
        character.velocity.y += gravity;

        requestAnimationFrame(update);
    }
    update();
});
