export default class LevelHandler {
    constructor() {
        this.currentLevel = 1;
    }

    setLevel(level) {
        if (level = 1) {
            this.currentLevel = 1;
        } else if (level = 2) {
            this.currentLevel = 2;
        } else if (level = 3) {
            this.currentLevel = 3;
        }
    }

    getLevel() {
        return this.currentLevel;
    }
}
