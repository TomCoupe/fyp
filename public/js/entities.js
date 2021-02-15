import Entity from './Entity.js';
import Jump from './traits/Jump.js';
import Move from './traits/Move.js';
import {loadSpriteSheet} from './loaders.js';

export function createCharacter() {
    return loadSpriteSheet('player')
    .then(sprite => {
        console.log(sprite);
        const player = new Entity();

        player.size.set(14, 16);
        player.addTrait(new Move());
        player.addTrait(new Jump());

        const playerFrame = ['run-1', 'run-2', 'run-3'];

        function choosePlayerFrame(player) {
            if(player.Move.direction !== 0) {
                const playerFrameIndex = Math.floor(player.Move.distance / 10) % playerFrame.length; 
                return playerFrame[playerFrameIndex];
            }
            return 'idle';
        }  

        player.draw = function drawMario(context) {
            sprite.draw(choosePlayerFrame(this), context, 0, 0, player.Move.directionFacing < 0);
        }

        return player;
    });
}