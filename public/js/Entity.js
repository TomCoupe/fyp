import {Vector} from './math.js';

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    obstruct() {}

    update() {
        console.warn('Unhandled update call in Trait');
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vector(0, 0);
        this.vel = new Vector(0, 0);
        this.size = new Vector(0, 0);

        this.lives = 3;
        this.points = 0;
        this.traits = [];

        this.type = '';
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    obstruct(side) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }

    playerReset() {
        this.pos.set(64, 64);
        this.lives = this.lives - 1;
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }
}
