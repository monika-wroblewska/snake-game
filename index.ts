import "./scss/main.scss";
import { Game } from './game-modules/game';
import { renderCleanGameScreen } from './game-modules/render';

renderCleanGameScreen();
let game = new Game();
game.start();
