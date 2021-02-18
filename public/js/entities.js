import Entity from './Entity.js';
import Jump from './traits/Jump.js';
import Move from './traits/Move.js';
import EnemyWalk from './traits/EnemyWalk.js';
import {loadSpriteSheet} from './loaders.js';

export function createCharacter() {
    return loadSpriteSheet('player')
    .then(sprite => {
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

export function createEnemy1() {
    return loadSpriteSheet('enemy-1')
    .then(sprite => {
        const enemy = new Entity();

        enemy.addTrait(new EnemyWalk());
        enemy.size.set(16, 16);

        const enemyFrame = ['mov-1', 'mov-2'];

        function chooseEnemyFrame(enemy) {
            if(enemy.enemyWalk.direction !== 0) {
                const enemyFrameIndex = Math.floor(enemy.enemyWalk.distance / 10) % enemyFrame.length;
                return enemyFrame[enemyFrameIndex];
            }
            return 'mov-1';
        }

        enemy.draw = function drawEnemy(context) {
            sprite.draw(chooseEnemyFrame(this), context, 0, 0, enemy.vel.x < 0);
        }
        return enemy;
    })

}