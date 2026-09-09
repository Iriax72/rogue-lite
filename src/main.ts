// Imports
import {Game} from './class/Game.js';
import {Player} from './class/Player.js';
import {Inputs} from './class/Inputs.js';
import {ATH} from './class/ATH.js';

console.log('Imports terminés.');
// References DOM
const gameCanvas: HTMLCanvasElement = document.querySelector('#game-canvas');

// Données arbitraires
const TILE_SIZE = 32;

// Initialisation
const response = await fetch('./map.json');
const map: number[][] = await response.json();

await Promise.all(Array.from(document.images).map((image: HTMLImageElement): Promise<void> => {
    if (image.complete) {
        return image.decode().catch(() => undefined);
    }

    return new Promise((resolve) => {
        image.addEventListener('load', ():void => {resolve()}, {once: true});
        image.addEventListener('error', ():void => {resolve()}, {once: true});
    });
}));

console.log('Création des instances de classe:')

const player = new Player(
    59, 240,
    map, TILE_SIZE
);
console.log('player: ok');
const ath = new ATH(gameCanvas, player);
console.log('ATH: ok');
const inputs = new Inputs(gameCanvas);
console.log('Inputs: ok');
const game = new Game(
    gameCanvas,
    map,
    TILE_SIZE,
    player,
    inputs,
    ath
);
console.log('game: ok');
game.init();
console.log('main.ts executé avec succes !')