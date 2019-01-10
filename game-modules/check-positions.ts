import { IPosition } from './interfaces';
import {
    FIELD_ROWS,
    FIELD_COLUMNS,
    UP,
    DOWN,
    LEFT,
    RIGHT
} from './constants';

export const checkGameFieldConstraints: { (position: IPosition): boolean } = (position) => {
    if (position.row < 0 || position.row >= FIELD_ROWS) {
        return false;
    } else if (position.col < 0 || position.col >= FIELD_COLUMNS) {
        return false;
    } else {
        return true;
    }
};
export const checkFieldAvailability: { (positionArr: IPosition[], position: IPosition): boolean } = (positionArr, position) => {
    let found = positionArr.find((value: IPosition) => {
        return position.row === value.row && position.col === value.col
    });
    if (found !== undefined) {
        return false;
    }
    return true;
};

export const checkIfEqualPositions: { (position1: IPosition, position2: IPosition): boolean } = (position1, position2) => {
    if (position1.row === position2.row && position1.col === position2.col) {
        return true;
    }
    return false;
};

export const calculateNewPosition: { (headPosition: IPosition, direction: Symbol): IPosition } = (headPosition, direction) => {
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