import { IPosition } from './interfaces';
import {FIELD_SIZE} from './constants';

export const checkGameFieldConstraints: { (position: IPosition): boolean } = (position) => {
    if (position.row < 0 || position.row >= FIELD_SIZE) {
        return false;
    } else if (position.col < 0 || position.col >= FIELD_SIZE) {
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