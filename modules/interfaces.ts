/**
 * INTERFACES
 */
export interface IPosition {
    row: number;
    col: number;
}

export interface IGame {
    playing: boolean;
    score: number;
}

export interface EventObject {
    keyCode: number;
}
