import { Trait } from '../Entity.js';

export default class EnemyWalk extends Trait {
    constructor() {
        super('enemyWalk');

        this.direction = 1;
        this.speed = 5000;
        this.distance = 0;
        this.directionFacing = true;
        this.lastPos = 0;
    }

    getDirection() {
        if (this.direction == 1) {
            return false;
        }
        return true;
    }

    checkDirection(entity) {
        if (this.direction = 1) {
            if (entity.pos.x > this.lastPos) {
                return true;
            }
            return false;
        }
        if (this.direction =  -1) {
            if (entity.pos.x <= this.lastPos) {
                return true;
            }
            return false;
        }

    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.direction * deltaTime;
        console.log(entity.vel.x);
        if (entity.pos.x == this.lastPos) {
            this.direction = -this.direction;
            this.lastPos = -1;
            this.distance += Math.abs(entity.vel.x * deltaTime);
        } 
        else {
            this.lastPos = entity.pos.x;
        }
    }
}