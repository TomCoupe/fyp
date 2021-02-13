
export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 2048;
    buffer.height = 240;

    const context = buffer.getContext('2d');

    level.tileMatrix.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);
    })
    
    return function drawBackgroundLayer(context, screen) {
        context.drawImage(buffer, -screen.position.x, -screen.position.y);
    };
}

export function createSpriteLayer(entities) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = 64;
    spriteBuffer.height = 64;
    const spriteBufferContext = spriteBuffer.getContext('2d');

    return function drawSpriteLayer(context, screen) {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, spriteBuffer.width, spriteBuffer.height);

            entity.draw(spriteBufferContext);

            context.drawImage(spriteBuffer, entity.pos.x - screen.position.x, entity.pos.y - screen.position.y)
        })
    };
}

export function createCollisionLayer(level) {
    const resolvedTiles = [];
    const tileDetector = level.tileCollision.tiles;
    const tileSize = tileDetector.tileSize;
    const getByIndexOriginal = tileDetector.getByIndex;

    tileDetector.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileDetector, x, y);
    }

    return function drawCollision(context, screen) {
        context.strokeStyle = 'blue';

        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect(x * tileSize - screen.position.x, y * tileSize - screen.position.y, tileSize, tileSize);
            context.stroke();
        });
        context.strokeStyle = 'purple';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.pos.x - screen.position.x, entity.pos.y - screen.position.y, entity.size.x, entity.size.y);
            context.stroke();
        })
        resolvedTiles.length = 0;
    }
}
