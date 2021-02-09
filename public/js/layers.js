
export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    const context = buffer.getContext('2d');

    level.tileMatrix.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);
    })
    
    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}

export function createSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);
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

    return function drawCollision(context) {
        context.strokeStyle = 'blue';

        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
            context.stroke();
        });
        context.strokeStyle = 'purple';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y);
            context.stroke();
        })
        resolvedTiles.length = 0;
    }
}
