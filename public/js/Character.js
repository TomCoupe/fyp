import { Vector } from "/js/maths.js";
import { draw } from "/js/helpers.js";

export default class Character {
    constructor() {
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
    }

    updateCharacter(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
    }

    draw(context, tiles) {
        draw('idle', context, this.position.x, this.position.y, tiles)
    }
}