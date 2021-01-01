
const PRESSED = 1;
const RELEASED = 0;

export default class KeyBoard {
    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();
    }

    addMapping(keyCode, callback) {
        this.keyMap.set(keyCode, callback);
    }

    handleEvent(event) {

        // console.log(event)
        const keyCode = event.type;

        console.log(keyCode);

        if (!this.keyMap.has(keyCode)) {

            console.log('one')
            return;
        }

        event.preventDefault();
        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        console.log(keyState)

        if (this.keyStates.get(keyCode) === keyState) {

            console.log('two')
            return;
        }
        this.keyStates.set(keyCode, keyState);
        console.log(keyStates);

        this.keyMap.get(keyCode)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            })
        });
    }
}
