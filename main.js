// Imports
import {Game} from './class/Game.js';

// References DOM
const gameCanvas = document.querySelector('#game-canvas');

// Initialisation
const response = await fetch('./map.json');
const map = await response.json();
const game = new Game(gameCanvas, map[0]);
game.init();