const startScreen: HTMLElement | null = document.getElementById('game-start-screen');
const gameOverScreen: HTMLElement | null = document.getElementById('game-over-screen');
const gameInfo: HTMLElement | null = document.getElementById('game-info');
const gamePausedScreen: HTMLElement | null = document.getElementById('game-paused-screen');


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

export const showStartScreen = () => {
    showElement(startScreen);
}

export const hideStartScreen = () => {
    hideElement(startScreen);
}

export const showGameOverScreen = () => {
    showElement(gameOverScreen);
}

export const hideGameOverScreen = () => {
    hideElement(gameOverScreen);
}

export const showGameInfo = () => {
    showElement(gameInfo);
}

export const hideGameInfo = () => {
    hideElement(gameInfo);
}

export const showPausedScreen = () => {
    showElement(gamePausedScreen);
}

export const hidePausedScreen = () => {
    hideElement(gamePausedScreen);
}