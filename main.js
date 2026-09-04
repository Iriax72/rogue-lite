// Imports
import {Game} from './class/Game.js';
import {Player} from './class/Player.js';
import {Inputs} from './class/Inputs.js';

// References DOM
const gameCanvas = document.querySelector('#game-canvas');

// Initialisation
const response = await fetch('./map.json');
const map = await response.json();
const player = new Player(59, 240);
const inputs = new Inputs();
const game = new Game(
    gameCanvas,
    map[0],
    player,
    inputs
);
game.init();