import { IPosition } from './interfaces';
import { FIELD_SIZE } from './constants';
import { checkFieldAvailability } from './check-positions';

const calculateRandomPosition: { (fieldSize: number): number } = (fieldSize) => {
    return Math.floor(Math.random() * (fieldSize));
}

const getNewPoint: { (): IPosition } = () => {
    return {
        row: calculateRandomPosition(FIELD_SIZE),
        col: calculateRandomPosition(FIELD_SIZE)
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
