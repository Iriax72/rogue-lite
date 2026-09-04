// Imports
import {Game} from './class/Game.js';

// References DOM
const gameCanvas = document.quetySelector('#game-canvas');

// Initialisation
let map = await fetch('./map.json');
map = JSON.parse(map);
const game = new Game(gameCanvas, map[0]);
game.init();