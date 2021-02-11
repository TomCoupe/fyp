import Keyboard from './Keyboard.js';

export function watchKeyBoard(character) {
    /*
    adds keys to the keyboard map and then listens to window for a key press.
    on key press the keyboard handles the event.
    */
    const keyBoardInput = new Keyboard();
    const SPACE = 32;
    const RIGHT = 39;
    const LEFT = 37;

    keyBoardInput.addMapping(SPACE, keyState => {
        if (keyState) {
            character.jump.start();
        } else {
            character.jump.cancel();
        }
    }); 

    keyBoardInput.addMapping(RIGHT, keyState => {
        character.Move.direction = keyState;
    });

    keyBoardInput.addMapping(LEFT, keyState => {
        character.Move.direction = -keyState;
    });
    keyBoardInput.listenTo(window);
}