import {Vec2} from './math.js';

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    update() {
        console.warn('Unhandled update call in Trait');
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);

        this.lives = 3;

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    obstruct(side) {
        console.log(side);    
    
    }

    playerReset() {
        this.pos.set(64, 64);
        this.lives = 3;
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }
}