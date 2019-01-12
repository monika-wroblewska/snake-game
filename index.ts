import "./scss/main.scss";
import { Game } from './game-modules/game';
import { renderCleanGameScreen } from './game-modules/render';

renderCleanGameScreen();
const game = new Game;

game.init();