import TileDetector from './TileDetector.js';

export default class TileCollision {

    constructor(tileMatrix) {
        this.tiles = new TileDetector(tileMatrix);
    }

    checkPosY(entity, screen) {

        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y);

        matches.forEach(match => {
            if (match.tile.name !== 'ground') {
                if (match.tile.name == 'death-block') {
                    entity.pos.set(64, 64);
                    screen.position.set(0, 0);
                }
                return;
            }

            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                    entity.obstruct('bottom');
                }
            } else if (entity.vel.y < 0) {
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;
                }
            }
        })
    }

    checkPosX(entity, screen) {

        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y);

        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                if (match.tile.name == 'death-block') {
                    entity.pos.set(64, 64);
                    screen.position.set(0, 0);
                }
                return;
            }

            if (entity.vel.x > 0) {
                if (entity.pos.x + entity.size.x > match.x1) {
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;
                }
            } else if (entity.vel.x < 0) {
                if (entity.pos.x < match.x2) {
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;
                }
            }
        })
    }

    testCollision(entity) {
        this.checkPosX(entity)
        this.checkPosY(entity);
        const match = this.tiles.searchByPosition(entity.pos.x, entity.pos.y);
        if (match) {
            // console.log('matched tile', match, match.tile);
        }
    }
}