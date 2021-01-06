import Trait from "./Trait.js";

export default class Velcoity extends Trait {
    constructor() {
        super('velocity');
    }

    update(character, deltaTime) {
        character.position.x += character.velocity.x * deltaTime;
        character.position.y += character.velocity.y * deltaTime;

    }
}