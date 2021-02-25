export function checkCollision(character, enemy, screen) {
    if (Math.round(enemy.pos.x) === Math.round(character.pos.x) && Math.round(enemy.pos.y) === Math.round(character.pos.y)) {
        character.pos.set(64, 64);
        screen.position.set(0, 0);
    }
}

export function checkWinBlock(xPos, yPos, character) {
    if (Math.floor(character.pos.x) == xPos && Math.floor(character.pos.y) == yPos) {
        return true;
    }
    return false;
}