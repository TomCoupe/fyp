import {Trait} from '../Entity.js';

export default class Move extends Trait {
    constructor() {
        super('Move');

        this.direction = 0;
        this.speed = 5000;
        this.distance = 0;
        this.directionFacing = 1;
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.direction * deltaTime;
        if (this.direction) {
            this.directionFacing = this.direction;
            this.distance += Math.abs(entity.vel.x * deltaTime);
        } else {
            this.distance = 0;
        }
    }
}
