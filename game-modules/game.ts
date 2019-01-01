import { IPosition, EventObject } from './interfaces';
import { renderCleanGameScreen, renderGameState } from './render';
import { UP, DOWN, LEFT, RIGHT } from './constants';
import {
    checkFieldAvailability,
    checkGameFieldConstraints,
    checkIfEqualPositions,
    calculateNewPosition
} from './check-positions';
import { setAwardPoint } from './award-point';

/**
 * GAME CLASS
 */
export class Game {
    private _playing: boolean;
    private _score: number;
    private _positionArr: IPosition[];
    private _awardPointPosition: IPosition | null;
    private _awardPoints: number;
    private _gameTimeoutIdentifier: Object | null;
    private _gameTimeoutMiliseconds: number;
    private _currentDirection: Symbol;
    private _newDirection: Symbol | null;

    constructor() {
        this._playing = true;
        this._score = 0;
        this._positionArr = [{ row: 0, col: 0 }]
        this._awardPointPosition = null;
        this._awardPoints = 10;
        this._gameTimeoutIdentifier = null;
        this._gameTimeoutMiliseconds = 300;
        this._currentDirection = RIGHT;
        this._newDirection = null;
    }
    get playing(): boolean {
        return this._playing;
    }
    start() {
        this._playing = true;
        this.handleEventListeners();
        this._positionArr = [{ row: 0, col: 0 }];
        this._awardPointPosition = setAwardPoint(this._positionArr);
        renderCleanGameScreen();
        renderGameState(this._positionArr, this._awardPointPosition);
        this.play();
    }
    play() {
        this._gameTimeoutIdentifier = setTimeout(() => {
            this.gameMove();
            renderGameState(this._positionArr, this._awardPointPosition);
            if (this._playing) {
                this.play();
            }
        }, this._gameTimeoutMiliseconds);
    }

    gameMove() {
        console.log(this._currentDirection);
        if (this._newDirection && this._newDirection !== this._currentDirection) {
            switch (this._newDirection) {
                case UP:
                    if (this._currentDirection !== DOWN) {
                        this._currentDirection = this._newDirection;
                    }
                    break;
                case DOWN:
                    if (this._currentDirection !== UP) {
                        this._currentDirection = this._newDirection;
                    }
                    break;
                case LEFT:
                    if (this._currentDirection !== RIGHT) {
                        this._currentDirection = this._newDirection;
                    }
                    break;
                case RIGHT:
                    if (this._currentDirection !== LEFT) {
                        this._currentDirection = this._newDirection;
                    }
                    break;
            }
        }
        let newPosition = calculateNewPosition(this._positionArr[0], this._currentDirection);
        if (!checkGameFieldConstraints(newPosition)) {
            this.gameOver();
        }
        if (!checkFieldAvailability(this._positionArr, newPosition)) {
            this.gameOver();
        }
        if (this._awardPointPosition && checkIfEqualPositions(newPosition, this._awardPointPosition)) {
            this._positionArr.push(this._awardPointPosition);
            this._awardPointPosition = setAwardPoint(this._positionArr);
            this._score += this._awardPoints;
        }
        this._positionArr.unshift(newPosition);
        this._positionArr.pop();
        if (this._playing) {
            renderCleanGameScreen();
            renderGameState(this._positionArr, this._awardPointPosition);
        }
    }
    gameOver() {
        this._playing = false;
        this.handleEventListeners();
    }

    handleEventListeners() {
        if (this._playing) {
            document.addEventListener('keyup', this.setKeyboardControls.bind(this), false);
        } else {
            document.removeEventListener('keyup', this.setKeyboardControls.bind(this), false);
        }
    }
    setKeyboardControls(event: EventObject) {
        console.log('fire');
        switch (event.keyCode) {
            case 38:
                this._newDirection = UP;
                break;
            case 40:
                this._newDirection = DOWN;
                break;
            case 37:
                this._newDirection = LEFT;
                break;
            case 39:
                this._newDirection = RIGHT;
                break;
        }
    }
}