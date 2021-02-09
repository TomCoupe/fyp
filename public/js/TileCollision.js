import TileDetector from './TileDetector.js';

export default class TileCollision {

    constructor(tileMatrix) {
        this.tiles = new TileDetector(tileMatrix);
    }

    checkPosY(entity) {
        const match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y);

        if(!match || match.tile.name !== 'ground') {
            return
        }

        if(entity.vel.y > 0) {
            if(entity.pos.y > match.y1) {
                entity.pos.y = match.y1;
                entity.vel.y = 0;
            }
        } else if (entity.vel.y < 0) {
            if(entity.pos.y < match.y2) {
                entity.pos.y = match.y2;
                entity.vel.y = 0;
            }
        }
    }

    testCollision(entity) {
        this.checkPosY(entity);
        const match = this.tiles.searchByPosition(entity.pos.x, entity.pos.y);
        if(match) {
            // console.log('matched tile', match, match.tile);
        }
    }
}