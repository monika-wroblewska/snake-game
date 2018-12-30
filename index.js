"use strict";
/**
 * GLOBAL VARIABLES
 */
const fieldSize = 10; //the field of the game is 20x20 fields big
const positionArr = [];
let awardPoint = null;
let game = false;
/**
 * DIRECTIONS
 * */
const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
let currentDirection = RIGHT;
let newDirection = null;
/**
 * FUNCTIONS
 */
const renderClearGameScreen = () => {
    let fieldHTML = '';
    for (let i = fieldSize - 1; i >= 0; i--) {
        let row = '';
        for (let j = 0; j < fieldSize; j++) {
            row += `<div class="field row${i} col${j}"></div>`;
        }
        fieldHTML += `<div class="row">${row}</div>`;
    }
    document.body.innerHTML = `<div class="game-field">${fieldHTML}</div>`;
};
const resetPositionArr = () => {
    positionArr.length = 0;
    positionArr.push({
        row: 0,
        col: 0
    });
};
const setKeyboardControls = (event) => {
    switch (event.keyCode) {
        case 38:
            newDirection = UP;
            break;
        case 40:
            newDirection = DOWN;
            break;
        case 37:
            newDirection = LEFT;
            break;
        case 39:
            newDirection = RIGHT;
            break;
        // case 32:
        //     console.log('break');
        //     break;
        // case 27:
        //     console.log('finish game');
    }
    ;
};
// const setKeyboardControls = (event: EventObject) => {
//     switch (event.keyCode) {
//         case 38:
//             if (currentDirection != DOWN) {
//                 currentDirection = UP;
//             }
//             break;
//         case 40:
//             if (currentDirection != UP) {
//                 currentDirection = DOWN;
//             }
//             break;
//         case 37:
//             if (currentDirection != RIGHT) {
//                 currentDirection = LEFT;
//             }
//             break;
//         case 39:
//             if (currentDirection != LEFT) {
//                 currentDirection = RIGHT;
//             }
//             break;
//         case 32:
//             console.log('break');
//             break;
//         case 27:
//             console.log('finish game');
//     };
//     console.log(currentDirection);
// };
const handleKeyboardControls = () => {
    if (game) {
        document.addEventListener('keyup', setKeyboardControls, false);
    }
    else {
        document.removeEventListener('keyup', setKeyboardControls, false);
    }
};
const checkGameFieldConstraints = (position) => {
    if (position.row < 0 || position.row >= fieldSize) {
        return false;
    }
    else if (position.col < 0 || position.col >= fieldSize) {
        return false;
    }
    else {
        return true;
    }
};
const checkFieldAvailability = (position) => {
    let found = positionArr.find((value) => {
        return position.row === value.row && position.col === value.col;
    });
    if (found !== undefined) {
        return false;
    }
    return true;
};
const addClass = (position, className) => {
    let element = document.getElementsByClassName(`row${position.row} col${position.col}`);
    if (element && element.length > 0) {
        element[0].classList.add(className);
    }
};
const mapPositions = () => {
    //map the snake's position
    positionArr.map((position) => {
        addClass(position, 'active');
    });
    //add awardPoint position
    if (awardPoint) {
        addClass(awardPoint, 'award');
    }
};
const calculateNewPosition = (headPosition, direction) => {
    switch (direction) {
        case RIGHT:
            return Object.assign({}, headPosition, { col: (headPosition.col + 1) });
        case UP:
            return Object.assign({}, headPosition, { row: (headPosition.row + 1) });
        case LEFT:
            return Object.assign({}, headPosition, { col: (headPosition.col - 1) });
        case DOWN:
            return Object.assign({}, headPosition, { row: (headPosition.row - 1) });
        default:
            return headPosition;
    }
};
const checkIfEqualPositions = (position1, position2) => {
    if (position1.row === position2.row && position1.col === position2.col) {
        return true;
    }
    return false;
};
const placeAwardPoint = () => {
    const calculateRandomPosition = () => {
        return Math.floor(Math.random() * (fieldSize));
    };
    const getNewPoint = () => {
        return {
            row: calculateRandomPosition(),
            col: calculateRandomPosition()
        };
    };
    let newAwardPointPosition = getNewPoint();
    if (checkFieldAvailability(newAwardPointPosition)) {
        awardPoint = newAwardPointPosition;
    }
    else {
        placeAwardPoint();
    }
    return;
};
const gameMove = () => {
    if (newDirection && newDirection !== currentDirection) {
    }
    switch (newDirection) {
        case UP:
            if (currentDirection !== DOWN) {
                currentDirection = newDirection;
            }
            break;
        case DOWN:
            if (currentDirection !== UP) {
                currentDirection = newDirection;
            }
            break;
        case LEFT:
            if (currentDirection !== RIGHT) {
                currentDirection = newDirection;
            }
            break;
        case RIGHT:
            if (currentDirection !== LEFT) {
                currentDirection = newDirection;
            }
            break;
    }
    let newPosition = calculateNewPosition(positionArr[0], currentDirection);
    if (!checkGameFieldConstraints(newPosition)) {
        gameOver();
    }
    if (!checkFieldAvailability(newPosition)) {
        gameOver();
    }
    if (awardPoint && checkIfEqualPositions(newPosition, awardPoint)) {
        positionArr.push(awardPoint);
        placeAwardPoint();
    }
    positionArr.unshift(newPosition);
    positionArr.pop();
    if (game) {
        renderClearGameScreen();
        mapPositions();
    }
};
const gameOver = () => {
    game = false;
    handleKeyboardControls();
};
const playGame = () => {
    setTimeout(() => {
        gameMove();
        mapPositions();
        if (game) {
            playGame();
        }
    }, 500);
};
const startGame = () => {
    game = true;
    handleKeyboardControls();
    resetPositionArr();
    placeAwardPoint();
    renderClearGameScreen();
    mapPositions();
};
startGame();
playGame();
