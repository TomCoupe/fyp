import {Trait} from '../Entity.js';

export default class Jump extends Trait {
    constructor() {
        super('Move');

        this.direction = 0;
        this.speed = 4000;
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.direction * deltaTime;
    }
}
