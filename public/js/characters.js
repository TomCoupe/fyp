import Character from './Character.js';
import Velocity from './Velocity.js';
import { loadCharacterTexture } from '/js/helpers.js';

export function createCharacter() {
    return loadCharacterTexture().then(sprite => {
        const character = new Character();
        character.addTrait(new Velocity());

        character.draw = function drawCharacter(context) {
            sprite.draw('idle', context, this.position.x, this.position.y);
        }
        return character;
    })
}