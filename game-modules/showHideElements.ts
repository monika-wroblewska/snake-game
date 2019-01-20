const startMsg: HTMLElement | null = document.getElementById('game-start-msg');
const gameOverMsg: HTMLElement | null = document.getElementById('game-over-msg');
const gameInfo: HTMLElement | null = document.getElementById('game-info');
const gamePausedMsg: HTMLElement | null = document.getElementById('game-paused-msg');
const startButton: HTMLElement | null = document.getElementById('start-button');
const pauseButton: HTMLElement | null = document.getElementById('pause-button');

const showElement: { (screen: HTMLElement | null): void } = (screen) => {
    if (screen) {
        screen.setAttribute('style', 'visibility: visible');
    }
}


const hideElement: { (screen: HTMLElement | null): void } = (screen) => {
    if (screen) {
        screen.setAttribute('style', 'visibility: hidden');
    }
}

export const showStartMsg = () => {
    showElement(startMsg);
}

export const hideStartMsg = () => {
    hideElement(startMsg);
}

export const showGameOverMsg = () => {
    showElement(gameOverMsg);
}

export const hideGameOverMsg = () => {
    hideElement(gameOverMsg);
}

export const showGameInfo = () => {
    showElement(gameInfo);
}

export const hideGameInfo = () => {
    hideElement(gameInfo);
}

export const showPausedMsg = () => {
    showElement(gamePausedMsg);
}

export const hidePausedMsg = () => {
    hideElement(gamePausedMsg);
}

export const showStartButton = () => {
    showElement(startButton);
}

export const hideStartButton = () => {
    hideElement(startButton);
}

export const showPauseButton = () => {
    showElement(pauseButton);
}

export const hidePauseButton = () => {
    hideElement(pauseButton);
}