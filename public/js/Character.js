import { Vector } from "/js/maths.js";
import { draw } from "/js/helpers.js";
import Trait from "./Trait.js";

export default class Character extends Trait {
    constructor() {
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.trait = new Trait();
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

    // updateCharacter(deltaTime) {
    //     this.position.x += this.velocity.x * deltaTime;
    //     this.position.y += this.velocity.y * deltaTime;
    // }

    draw(context, tiles) {
        draw('idle', context, this.position.x, this.position.y, tiles)
    }
}