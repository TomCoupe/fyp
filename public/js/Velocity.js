import {Trait} from "./Character.js";

export default class Velocity extends Trait {
    constructor() {
        super('velocity');
    }

    update(character, deltaTime) {
        character.position.x += character.velocity.x * deltaTime;
        character.position.y += character.velocity.y * deltaTime;
    }
}