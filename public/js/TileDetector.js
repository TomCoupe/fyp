export default class TileDetector {
    constructor(matrix, tilesize = 16) {
        this.matrix = matrix;
        this.tilesize = tilesize;
    }

    toIndex(position) {
        return Math.floor(position / this.tilesize)
    }

    getByIndex(indX, indY) {
        const tile = this.matrix.get(indX, indY);
        if(tile) {
            return {
                tile,
            }
        }
    }

    matchByPosition(posX, posY) {
        return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
    }
}