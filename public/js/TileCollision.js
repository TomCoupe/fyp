import TileDetector from './TileDetector.js';

export default class TileCollision {

    constructor(tileMatrix) {
        this.tiles = new TileDetector(tileMatrix);
    }

    testCollision(entity) {
        const match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y);

        console.log(match, match.tile);
    }
}