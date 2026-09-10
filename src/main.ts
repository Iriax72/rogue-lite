import { assertDefined } from './functions.js';

import {Game} from './class/Game.js';
import {Player} from './class/Player.js';
import {Inputs} from './class/Inputs.js';
import {ATH} from './class/ATH.js';
import {map} from './map.js';

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