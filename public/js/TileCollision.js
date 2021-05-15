import TileDetector from './TileDetector.js';

export default class TileCollision {

    constructor(tileMatrix) {
        this.tiles = new TileDetector(tileMatrix);

        this.killBlocks = ['death-block', 'spike-1', 'spike-2'];
        this.pointBlocks = ['coin'];
    }

    checkPosY(entity, screen, level, context) {

        //takes the entities current position, and the entities size to find the current tile.
        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x, //x1, x2
            entity.pos.y, entity.pos.y + entity.size.y); //y1, y2

        matches.forEach(match => {

            if (match.tile.name == 'win-block') {
                return;
            }

            if (match.tile.name !== 'ground') {

                //checks collisions of kill blocks
                if (this.killBlocks.includes(match.tile.name)) {
                    entity.pos.set(64, 64);
                    screen.position.set(0, 0);
                    if (entity.lives > 0) {
                        entity.lives = entity.lives - 1;
                    } else {
                        entity.dead = true;
                    } 
                }
                //checks collisions of coins for a player type
                if (match.tile.name === 'coin' && entity.type === 'player') {
                    if(this.tiles.matrix.grid[Math.round(entity.pos.x/16)][Math.round(entity.pos.y/16)].name == 'coin') {
                        this.tiles.matrix.grid[Math.round(entity.pos.x/16)][Math.round(entity.pos.y/16)].name = 'sky';
                        entity.points = entity.points + 100;
                        level.game.draw(context, screen);
                    }
                }

                return;
            }

            if (entity.vel.y > 0) {
                //if the entities size and position is greater than the tile match. entitys y position needs correcting.
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                    entity.obstruct('bottom');
                }

            } else if (entity.vel.y < 0) {
                //else entity must be airborne.
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;
                }

            }
        })
    }

    checkPosX(entity, screen, level, context) {

        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y);

        matches.forEach(match => {

            if (match.tile.name == 'win-block') {
                return;
            }

            if (match.tile.type !== 'ground') {
                if (this.killBlocks.includes(match.tile.name)) {
                    entity.pos.set(64, 64);
                    // entity.lives = entity.lives - 1;
                    screen.position.set(0, 0);
                }

                //coin collision
                if (match.tile.name === 'coin' && entity.type === 'player') {
                    if(this.tiles.matrix.grid[Math.round(entity.pos.x/16)][Math.round(entity.pos.y/16)].name == 'coin') {
                        this.tiles.matrix.grid[Math.round(entity.pos.x/16)][Math.round(entity.pos.y/16)].name = 'sky';
                        entity.points = entity.points + 100;
                        level.game.draw(context, screen)
                        console.log(entity.points);
                    }
                }

                return;
            }

            if (entity.vel.x > 0) {
                //if entities size is greater than the tile match. needs correcting to not be inside tile.
                if (entity.pos.x + entity.size.x > match.x1) {
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;
                }

            } else if (entity.vel.x < 0) {
                //else entity is not conflicting with tile
                if (entity.pos.x < match.x2) {
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;
                }
            }
        })
    }
}