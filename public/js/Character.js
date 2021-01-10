import { Vector } from "/js/maths.js";
import { draw } from "/js/helpers.js";
import Velocity from "./Velocity.js"


export class Trait {
    constructor(name) {
        this.NAME = name
    }

    update() {
        console.warn("unhandled update call in Trait");
    }
}

export default class Character {

    constructor() {
        // super();
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        })
    }

    // updateCharacter(deltaTime) {x
    //     this.position.x += this.velocity.x * deltaTime;
    //     this.position.y += this.velocity.y * deltaTime;
    // }

    draw(context, tiles) {
        draw('idle', context, this.position.x, this.position.y, tiles)
    }
}