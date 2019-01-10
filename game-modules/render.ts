import { IPosition } from './interfaces';
import {
    FIELD_COLUMNS,
    FIELD_ROWS
} from './constants';

const addClass: { (positions: IPosition, className: string): void } = (position, className) => {
    let element = document.getElementsByClassName(`row${position.row} col${position.col}`);
    if (element && element.length > 0) {
        element[0].classList.add(className);
    }
}

export const renderCleanGameScreen: { (): void } = () => {
    let fieldHTML: string = '';
    for (let rowNum: number = FIELD_ROWS - 1; rowNum >= 0; rowNum--) {
        let row = '';
        for (let colNum: number = 0; colNum < FIELD_COLUMNS; colNum++) {
            row += `<div class="tile row${rowNum} col${colNum}"></div>`
        }
        fieldHTML += `<div class="game-row">${row}</div>`;
    }
    const fieldElement = document.getElementById('snake-game');
    if (fieldElement) {
        fieldElement.innerHTML = `<div class="game-fields">${fieldHTML}</div>`
    }
};

export const renderGameState: { (postionArr: IPosition[], awardPoint: IPosition | null): void } = (positionArr, awardPoint) => {
    //map the snake's position
    positionArr.map((position, index) => {
        if (index === 0) {
            addClass(position, 'tile--head');
        }
        addClass(position, 'tile--active');
    });
    //add awardPoint position
    if (awardPoint) {
        addClass(awardPoint, 'tile--award');
    }
};

export const renderScore: { (score: number): void } = score => {
    let DOMElem = document.getElementById('score');
    if (DOMElem) {
        DOMElem.innerHTML = String(score);
    }
};