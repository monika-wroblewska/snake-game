import { IPosition } from './interfaces';
import {
    FIELD_ROWS,
    FIELD_COLUMNS
} from './constants';
import { checkFieldAvailability } from './check-positions';

const calculateRandomPosition: { (fieldSize: number): number } = (fieldSize) => {
    return Math.floor(Math.random() * (fieldSize));
}

const getNewPoint: { (): IPosition } = () => {
    return {
        row: calculateRandomPosition(FIELD_ROWS),
        col: calculateRandomPosition(FIELD_COLUMNS)
    }
}
export const setAwardPoint: { (positionArr: IPosition[]): IPosition } = (positionArr) => {
    let newAwardPointPosition: IPosition = getNewPoint();
    if (checkFieldAvailability(positionArr, newAwardPointPosition)) {
        return newAwardPointPosition;
    } else {
        return setAwardPoint(positionArr);
    }
}
