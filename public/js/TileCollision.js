import TileDetector from './TileDetector.js';

export default class TileCollision {

    constructor(tileMatrix) {
        this.tiles = new TileDetector(tileMatrix);

         this.killBlocks = ['death-block', 'spike-1', 'spike-2'];
    }

    checkPosY(entity, screen, levelHandler) {

        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y);

        matches.forEach(match => {

            if(match.tile.name == 'win-block') {
                let level = levelHandler.getLevel();
                levelHandler.setLevel(level+1);
                return;
            }
            
            if (match.tile.name !== 'ground') {

                if (this.killBlocks.includes(match.tile.name)) {
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

    checkPosX(entity, screen, levelHandler) {

        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y);

        matches.forEach(match => {

            if(match.tile.name == 'win-block') {
                let level = levelHandler.getLevel();
                levelHandler.setLevel(level+1);
                return;
            }

            if (match.tile.type !== 'ground') {
                if (this.killBlocks.includes(match.tile.name)) {
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
        this.tiles.searchByPosition(entity.pos.x, entity.pos.y);
    }
}