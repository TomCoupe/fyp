import { Trait } from '../Entity.js';

export default class EnemyFly extends Trait {
    constructor() {
        super('enemyFly');

        this.direction = 1;
        this.speed = 4500;
        this.distance = 0;
        this.directionFacing = true;
        this.lastPos = 0;
    }

    update(entity, deltaTime) {
        entity.vel.y = this.speed * this.direction * deltaTime;
        if (entity.pos.y == this.lastPos) {
            this.direction = -this.direction;
            this.lastPos = -1;
        } 
        else {
            this.lastPos = entity.pos.y;
        }
    }
} 