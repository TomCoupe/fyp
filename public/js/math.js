export class Matrix {
    constructor() {
        this.grid = [];
    }

    get(x, y) {
        const column = this.grid[x];
        if(column) {
            return column[y];
        }
        return undefined;
    }

    forEach(callback) {
        this.grid.forEach((column, x) => {
            column.forEach((val, y) => {
                callback(val, x, y);
            })
        })
    }

    set(x, y, tileValue) {
        if(!this.grid[x]) {
            this.grid[x] = [];
        }
        this.grid[x][y] = tileValue;
    }
}

export class Vector {
    constructor(x, y) {
        this.set(x, y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
