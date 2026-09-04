// Imports
import {Game} from './class/Game.js';

// References DOM
const gameCanvas = document.querySelector('#game-canvas');

// Initialisation
let map = await fetch('./map.json');
map = await map.json();
map = JSON.parse(map);
const game = new Game(gameCanvas, map[0]);
game.init();