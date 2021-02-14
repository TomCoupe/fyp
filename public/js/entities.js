import Entity from './Entity.js';
import Jump from './traits/Jump.js';
import Move from './traits/Move.js';
import Velocity from './traits/Velocity.js';
import {loadSpriteSheet} from './loaders.js';

export function createCharacter() {
    return loadSpriteSheet('player')
    .then(sprite => {
        console.log(sprite);
        const player = new Entity();

        player.size.set(14, 16);
        player.addTrait(new Move());
        player.addTrait(new Jump());

        player.draw = function drawMario(context) {
            sprite.draw('idle', context, 0, 0);
        }

        return player;
    });
}