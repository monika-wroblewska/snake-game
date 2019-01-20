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
    showStartMsg,
    hideStartMsg,
    showGameOverMsg,
    hideGameOverMsg,
    showGameInfo,
    hideGameInfo,
    hidePausedMsg,
    showPausedMsg as showPausedScreen
} from './showHideElements';

/**
 * GAME CLASS
 */
export class Game {
    private playing: boolean;
    private score: number;
    private positionArr: IPosition[];
    private awardPointPosition: IPosition | null;
    private awardPoints: number;
    private gameTimeoutIdentifier: NodeJS.Timer | null;
    private initTimeout: number;
    private gameTimeoutMiliseconds: number;
    private currentDirection: Symbol;
    private newDirection: Symbol | null;

    constructor() {
        this.playing = false;
        this.score = 0;
        this.positionArr = [{ row: 0, col: 0 }];
        this.awardPointPosition = null;
        this.awardPoints = 10;
        this.gameTimeoutIdentifier = null;
        this.initTimeout = 300;
        this.gameTimeoutMiliseconds = 0;
        this.currentDirection = RIGHT;
        this.newDirection = null;
    }

    init() {
        renderCleanGameScreen();
        showStartMsg();
        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener('keyup', this.setKeyboardControls.bind(this), false);
    }

    setKeyboardControls(event: KeyboardEvent) {
        switch (event.keyCode) {
            case 38:
                this.updateNewDirection(UP);
                break;
            case 40:
                this.updateNewDirection(DOWN);
                break;
            case 37:
                this.updateNewDirection(LEFT);
                break;
            case 39:
                this.updateNewDirection(RIGHT);
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

    updateNewDirection(direction: Symbol) {
        if (!this.isGamePaused()) {
            this.newDirection = direction;
        }
    }

    start() {
        this.resetGame();
        this.playing = true;
        this.positionArr = [{ row: 0, col: 0 }];
        this.awardPointPosition = setAwardPoint(this.positionArr);
        this.playGameScreen();
        this.play();
    }

    resetGame() {
        this.currentDirection = RIGHT;
        this.newDirection = null;
        this.score = 0;
        this.gameTimeoutMiliseconds = this.initTimeout;
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

    gameOver() {
        this.playing = false;
        this.gameOverScreen();
    }

    playGameScreen() {
        hideStartMsg();
        hideGameOverMsg();
        showGameInfo();
        renderCleanGameScreen();
        renderGameState(this.positionArr, this.awardPointPosition);
        renderScore(this.score);
    }

    gameOverScreen() {
        hideGameInfo();
        showGameOverMsg();
    }

    pauseGameScreen() {

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
            this.increaseSpeed();
        }
        this.positionArr.unshift(newPosition);
        this.positionArr.pop();
        if (this.playing) {
            renderCleanGameScreen();
            renderGameState(this.positionArr, this.awardPointPosition);
        }
    }

    addPointsToScore(points: number) {
        this.score += points;
        renderScore(this.score);
    }

    increaseSpeed() {
        if ((this.score > 0) && !(this.score % 30)) {
            this.gameTimeoutMiliseconds -= 15;
        }
    }

    pause() {
        if (this.playing) {
            if (!this.gameTimeoutIdentifier) {
                this.play();
                hidePausedMsg();
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
        this.gameTimeoutIdentifier = null;
    }

    isGamePaused() {
        return this.gameTimeoutIdentifier
            ? false
            : true;
    }
}