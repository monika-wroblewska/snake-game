import { IPosition, IGame, EventObject } from './interfaces';
import { renderCleanGameScreen, renderGameState } from './render-functions';
import { UP, DOWN, LEFT, RIGHT } from './constants';
import {
    checkFieldAvailability,
    checkGameFieldConstraints,
    checkIfEqualPositions
} from './check-functions';
import { setAwardPoint } from './award-point-functions';
let positionArr: IPosition[] = [];

let awardPoint: null | IPosition = null;

let game: IGame = {
    playing: true,
    score: 0
};

let timeout: number = 500;

let award = 10;

/**
 * DIRECTIONS
 * */

let currentDirection: Symbol = RIGHT;

let newDirection: Symbol | null = null;

/**
 * GAME
 */
const resetPositionArr: { (): IPosition[] } = () => {
    return [{ row: 0, col: 0 }];
};

const setKeyboardControls = (event: EventObject) => {
    switch (event.keyCode) {
        case 38:
            newDirection = UP
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
    };
};

const handleKeyboardControls: { (game: IGame): void } = (game) => {
    if (game.playing) {
        document.addEventListener('keyup', setKeyboardControls, false);
    } else {
        document.removeEventListener('keyup', setKeyboardControls, false);
    }
};

const calculateNewPosition: { (headPosition: IPosition, direction: Symbol): IPosition } = (headPosition, direction) => {
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

const gameMove: { (): void } = () => {
    if (newDirection && newDirection !== currentDirection) {
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
    }
    let newPosition = calculateNewPosition(positionArr[0], currentDirection);
    if (!checkGameFieldConstraints(newPosition)) {
        gameOver();
    }
    if (!checkFieldAvailability(positionArr, newPosition)) {
        gameOver();
    }
    if (awardPoint && checkIfEqualPositions(newPosition, awardPoint)) {
        positionArr.push(awardPoint);
        awardPoint = setAwardPoint(positionArr);
        game.score += award;
    }
    positionArr.unshift(newPosition);
    positionArr.pop();
    if (game.playing) {
        renderCleanGameScreen();
        renderGameState(positionArr, awardPoint);
    }
}

const gameOver: { (): void } = () => {
    game.playing = false;
    handleKeyboardControls(game);
}

const playGame = () => {
    setTimeout(() => {
        gameMove();
        renderGameState(positionArr, awardPoint);
        if (game.playing) {
            playGame();
        }
    }, timeout);
}

export const startGame: { (): void } = () => {
    game = {
        playing: true,
        score: 0
    };
    handleKeyboardControls(game);
    positionArr = resetPositionArr();
    awardPoint = setAwardPoint(positionArr);
    renderCleanGameScreen();
    renderGameState(positionArr, awardPoint);
    playGame();
};