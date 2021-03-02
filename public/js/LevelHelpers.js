export function checkCollision(character, enemy, screen) {
    if (Math.round(enemy.pos.x + enemy.size.x) === Math.round(character.pos.x + enemy.size.x) && 
    Math.round(enemy.pos.y + enemy.size.y) === Math.round(character.pos.y + character.size.y)) {
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