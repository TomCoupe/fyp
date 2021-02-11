import Keyboard from './Keyboard.js';

export function watchKeyBoard(character) {
    /*
    adds keys to the keyboard map and then listens to window for a key press.
    on key press the keyboard handles the event.
    */
    const keyBoardInput = new Keyboard();
    
    const SPACE = 'Space';
    const RIGHT = 'ArrowRight';
    const LEFT = 'ArrowLeft';

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