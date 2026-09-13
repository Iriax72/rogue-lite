import { assertDefined } from './functions.ts';

import {Game} from './class/Game.ts';
import {Player} from './class/Player.ts';
import {Inputs} from './class/Inputs.ts';
import {ATH} from './class/ATH.ts';
import {map} from './map.ts';

console.log('imports faits');

// References DOM
const gameCanvas: HTMLCanvasElement | null = document.querySelector('#game-canvas');
assertDefined(gameCanvas, 'Le canvas n\' a pas ete trouvé');

// Données arbitraires
const TILE_SIZE = 32;
const LEVEL = 0;

// Initialisation
const mapLevel = map[LEVEL];

await Promise.all(Array.from(document.images).map((image: HTMLImageElement): Promise<void> => {
    if (image.complete) {
        return image.decode().catch(() => undefined);
    }

    return new Promise((resolve) => {
        image.addEventListener('load', ():void => {resolve()}, {once: true});
        image.addEventListener('error', ():void => {resolve()}, {once: true});
    });
}));

const player = new Player(
    59, 240,
    mapLevel, TILE_SIZE
);

const ath = new ATH(gameCanvas, player);

const inputs = new Inputs(gameCanvas);

const game = new Game(
    gameCanvas,
    mapLevel,
    TILE_SIZE,
    player,
    inputs,
    ath
);

game.init();

console.log('main.ts executé');