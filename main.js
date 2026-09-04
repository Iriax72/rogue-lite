// Imports
import {Game} from './class/Game.js';
import {Player} from './class/Player.js';

// References DOM
const gameCanvas = document.querySelector('#game-canvas');

// Initialisation
const response = await fetch('./map.json');
const map = await response.json();
const player = new Player(1, 1);
const game = new Game(
    gameCanvas,
    map[0],
    player
);
game.init();