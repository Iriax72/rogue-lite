// Imports
import {Game} from './class/Game.js';
import {Player} from './class/Player.js';
import {Inputs} from './class/Inputs.js';
import {ATH} from './class/ATH.js';

// References DOM
const gameCanvas = document.querySelector('#game-canvas');

// Données arbitraires
const TILE_SIZE = 32;

// Initialisation
const response = await fetch('./map.json');
const map = await response.json();
const player = new Player(
    59, 240,
    map[0], TILE_SIZE
);
const ath = new ATH(gameCanvas, player);
const inputs = new Inputs();
const game = new Game(
    gameCanvas,
    map[0],
    TILE_SIZE,
    player,
    inputs,
    ath
);
game.init();