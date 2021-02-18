import {Trait} from '../Entity.js';

export default class EnemyWalk extends Trait {
    constructor() {
        super('enemyWalk');

        this.direction = 1;
        this.speed = 5000;
        this.distance = 0;
        this.directionFacing = 1;
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.direction * deltaTime;
        console.log(entity.vel.x);
        if (this.direction) {

            console.log(this.direction);
            this.directionFacing = this.direction;
            this.distance += Math.abs(entity.vel.x * deltaTime);
        } else {
            this.distance = 0;
        }
    }
}