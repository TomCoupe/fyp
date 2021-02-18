import {Trait} from '../Entity.js';

export default class EnemyWalk extends Trait {
    constructor() {
        super('enemyWalk');

        this.direction = 0;
        this.speed = 5000;
        this.distance = 0;
        this.directionFacing = 1;
    }

    update(enemy, deltaTime) {
        
    }
}