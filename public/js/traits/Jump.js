import {Trait} from '../Entity.js';

export default class Jump extends Trait {
    constructor() {
        super('jump');

        this.duration = 0.375;
        this.jumpAvailable = false;
        this.engageTime = 0;

        this.velocity = 200;
    }

    start() {
        if(this.jumpAvailable){
            this.engageTime = this.duration;
        }
    }

    cancel() {
        this.engageTime = 0;
    }

    obstruct(character, side) {
        if(side == 'bottom') {
            this.jumpAvailable = true;
        }
    }

    update(entity, deltaTime) {
        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;   
        }
        this.jumpAvailable = false;
    }
}
