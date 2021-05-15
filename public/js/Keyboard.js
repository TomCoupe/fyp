const PRESSED = 1;
const RELEASED = 0;

export default class Keyboard {
    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map();

        // Holds the callback functions for a key code
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    //sets key status's to a map or future refernce in code
    handleEvent(event) {    
        const {code} = event;

        if (!this.keyMap.has(code)) {
            // Did not have key mapped.
            return;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(code) === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }

    //listen to window input and handles event.
    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}