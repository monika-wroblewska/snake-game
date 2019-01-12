import { IPosition } from './interfaces';
import {
    renderCleanGameScreen,
    renderGameState,
    renderScore
} from './render';
import { UP, DOWN, LEFT, RIGHT } from './constants';
import {
    checkFieldAvailability,
    checkGameFieldConstraints,
    checkIfEqualPositions,
    calculateNewPosition
} from './check-positions';
import { setAwardPoint } from './award-point';
import {
    showStartScreen,
    hideStartScreen,
    showGameOverScreen,
    hideGameOverScreen,
    showGameInfo,
    hideGameInfo,
    hidePausedScreen,
    showPausedScreen
} from './screens';

/**
 * GAME CLASS
 */
export class Game {
    private playing: boolean;
    private score: number;
    private positionArr: IPosition[];
    private awardPointPosition: IPosition | null;
    private awardPoints: number;
    private gameTimeoutIdentifier: NodeJS.Timer | undefined;
    private gameTimeoutMiliseconds: number;
    private currentDirection: Symbol;
    private newDirection: Symbol | null;

    constructor() {
        this.playing = false;
        this.score = 0;
        this.positionArr = [{ row: 0, col: 0 }]
        this.awardPointPosition = null;
        this.awardPoints = 10;
        this.gameTimeoutIdentifier = undefined;
        this.gameTimeoutMiliseconds = 200;
        this.currentDirection = RIGHT;
        this.newDirection = null;
    }

    init() {
        renderCleanGameScreen();
        showStartScreen();
        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener('keyup', this.setKeyboardControls.bind(this), false)
    }

    setKeyboardControls(event: KeyboardEvent) {
        switch (event.keyCode) {
            case 38:
                this.newDirection = UP;
                break;
            case 40:
                this.newDirection = DOWN;
                break;
            case 37:
                this.newDirection = LEFT;
                break;
            case 39:
                this.newDirection = RIGHT;
                break;
            case 32:
                this.pause();
                break;
            case 13:
                if (!this.playing) {
                    this.start();
                }
                break;
        }
    }

    start() {
        hideStartScreen();
        hideGameOverScreen();
        showGameInfo();
        this.resetGame();
        this.playing = true;
        this.positionArr = [{ row: 0, col: 0 }];
        this.awardPointPosition = setAwardPoint(this.positionArr);
        renderCleanGameScreen();
        renderGameState(this.positionArr, this.awardPointPosition);
        renderScore(this.score);
        this.play();
    }

    resetGame() {
        this.currentDirection = RIGHT;
        this.newDirection = null;
        this.score = 0;
    }
    play() {
        this.gameTimeoutIdentifier = setTimeout(() => {
            this.gameMove();
            renderGameState(this.positionArr, this.awardPointPosition);
            if (this.playing) {
                this.play();
            }
        }, this.gameTimeoutMiliseconds);
    }

    gameMove() {
        if (this.newDirection && this.newDirection !== this.currentDirection) {
            switch (this.newDirection) {
                case UP:
                    if (this.currentDirection !== DOWN) {
                        this.currentDirection = this.newDirection;
                    }
                    break;
                case DOWN:
                    if (this.currentDirection !== UP) {
                        this.currentDirection = this.newDirection;
                    }
                    break;
                case LEFT:
                    if (this.currentDirection !== RIGHT) {
                        this.currentDirection = this.newDirection;
                    }
                    break;
                case RIGHT:
                    if (this.currentDirection !== LEFT) {
                        this.currentDirection = this.newDirection;
                    }
                    break;
            }
        }
        let newPosition = calculateNewPosition(this.positionArr[0], this.currentDirection);
        if (!checkGameFieldConstraints(newPosition)) {
            this.gameOver();
        }
        if (!checkFieldAvailability(this.positionArr, newPosition)) {
            this.gameOver();
        }
        if (this.awardPointPosition && checkIfEqualPositions(newPosition, this.awardPointPosition)) {
            this.positionArr.push(this.awardPointPosition);
            this.awardPointPosition = setAwardPoint(this.positionArr);
            this.addPointsToScore(this.awardPoints);
        }
        this.positionArr.unshift(newPosition);
        this.positionArr.pop();
        if (this.playing) {
            renderCleanGameScreen();
            renderGameState(this.positionArr, this.awardPointPosition);
        }
    }
    gameOver() {
        this.playing = false;
        hideGameInfo();
        showGameOverScreen();
    }

    addPointsToScore(points: number) {
        this.score += points;
        renderScore(this.score);
    }

    pause() {
        if (this.playing) {
            if (!this.gameTimeoutIdentifier) {
                this.play();
                hidePausedScreen();
                showGameInfo();
            } else {
                this.removeTimer();
                showPausedScreen();
                hideGameInfo();
            }
        }
    }

    removeTimer() {
        let timeout = Number(this.gameTimeoutIdentifier);
        clearTimeout(timeout);
        this.gameTimeoutIdentifier = undefined;
    }
}