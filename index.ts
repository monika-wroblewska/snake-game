/**
 * INTERFACES
 */
interface IPosition {
    row: number;
    col: number;
}

interface EventObject {
    keyCode: number;
}

/**
 * GLOBAL VARIABLES
 */
const fieldSize: number = 10; //the field of the game is 20x20 fields big

const positionArr: IPosition[] = [
    { row: 0, col: 0 },
];

let awardPoint: null | IPosition = null;

let game: boolean = false;

/**
 * DIRECTIONS
 * */
const UP: string = 'UP';
const DOWN: string = 'DOWN';
const LEFT: string = 'LEFT';
const RIGHT: string = 'RIGHT';

let currentDirection: string = RIGHT;

/**
 * FUNCTIONS
 */
const renderClearGameScreen = () => {
    let fieldHTML: string = '';
    for (let i: number = fieldSize - 1; i >= 0; i--) {
        let row = '';
        for (let j: number = 0; j < fieldSize; j++) {
            row += `<div class="field row${i} col${j}"></div>`
        }
        fieldHTML += `<div class="row">${row}</div>`;
    }
    document.body.innerHTML = `<div class="game-field">${fieldHTML}</div>`;
};

const resetPositionArr: { (): void } = () => {
    positionArr.length = 0;
    positionArr.push({
        row: 0,
        col: 0
    });
}
const setKeyboardControls = (event: EventObject) => {
    switch (event.keyCode) {
        case 38:
            if (currentDirection != DOWN) {
                currentDirection = UP;
            }
            break;
        case 40:
            if (currentDirection != UP) {
                currentDirection = DOWN;
            }
            break;
        case 37:
            if (currentDirection != RIGHT) {
                currentDirection = LEFT;
            }
            break;
        case 39:
            if (currentDirection != LEFT) {
                currentDirection = RIGHT;
            }
            break;
        case 32:
            console.log('break');
            break;
        case 27:
            console.log('finish game');
    };
};

const handleKeyboardControls = () => {
    if (game) {
        document.addEventListener('keyup', setKeyboardControls, false);
    } else {
        document.removeEventListener('keyup', setKeyboardControls, false);
    }
};

const checkGameFieldConstraints: { (position: IPosition): boolean } = (position) => {
    if (position.row < 0 || position.row >= fieldSize) {
        return false;
    } else if (position.col < 0 || position.col >= fieldSize) {
        return false;
    } else {
        return true;
    }
};
const checkFieldAvailability: { (position: IPosition): boolean } = (position) => {
    let found = positionArr.find((value: IPosition) => {
        return position.row === value.row && position.col === value.col
    });
    if (found !== undefined) {
        return false;
    }
    return true;
};

const addClass: { (positions: IPosition, className: string): void } = (position, className) => {
    let element = document.getElementsByClassName(`row${position.row} col${position.col}`);
    if (element && element.length > 0) {
        element[0].classList.add(className);
    }
}

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

const calculateNewPosition: { (headPosition: IPosition, direction: string): IPosition } = (headPosition, direction) => {
    switch (direction) {
        case RIGHT:
            return { ...headPosition, col: (headPosition.col + 1) };
        case UP:
            return { ...headPosition, row: (headPosition.row + 1) }
        case LEFT:
            return { ...headPosition, col: (headPosition.col - 1) };
        case DOWN:
            return { ...headPosition, row: (headPosition.row - 1) };
        default:
            return headPosition;
    }
}

const checkIfEqualPositions: { (position1: IPosition, position2: IPosition): boolean } = (position1, position2) => {
    if (position1.row === position2.row && position1.col === position2.col) {
        return true;
    }
    return false;
}

const placeAwardPoint = () => {
    const calculateRandomPosition = () => {
        return Math.floor(Math.random() * (fieldSize));
    }
    let newAwardPointPosition: IPosition = {
        row: calculateRandomPosition(),
        col: calculateRandomPosition()
    }
    if (checkFieldAvailability(newAwardPointPosition)) {
        placeAwardPoint();
    }
    awardPoint = newAwardPointPosition;
}

const gameMove: { (): void } = () => {
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
}

const gameOver: { (): void } = () => {
    game = false;
    handleKeyboardControls();
}

const playGame = () => {
    setTimeout(() => {
        gameMove();
        mapPositions();
        if (game) {
            playGame();
        }
    }, 500);
}

const startGame: { (): void } = () => {
    game = true;
    handleKeyboardControls();
    resetPositionArr();
    placeAwardPoint();
    renderClearGameScreen();
    mapPositions();
};


startGame();
playGame();