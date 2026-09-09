import {Loot} from "./loots/Loot.js";
import {Guardian} from "./enemys/Guardian.js";
import {Slime} from "./enemys/Slime.js";
import {Player} from "./Player.js";
import {Inputs} from "./Inputs.js";
import {Enemy} from "./enemys/Enemy.js";
import {ATH} from "./ATH.js";
import {Arrow} from "./shoots/Arrow.js";

type Timestamp = number;

export class Game {
    canvas: HTMLCanvasElement;
    map: number[][];
    player: Player;
    inputs: Inputs;
    loots: Loot[] = [];
    enemys: Enemy[] = []
    tile_size: number;
    ath: ATH;
    lastTimestamp: Timestamp;
    // Test
    // slimeImg: HTMLImageElement = document.querySelector('img#slime-img');

    constructor(canvas: HTMLCanvasElement, map: number[][], tile_size: number, player: Player, inputs: Inputs, ath: ATH) {
        this.canvas = canvas;
        this.map = map;
        this.tile_size = tile_size;
        this.player = player;
        this.inputs = inputs;
        this.ath = ath;
        this.dropLoot = this.dropLoot.bind(this);

        this.lastTimestamp = 0;
    }

    init(): void {
        this.canvas.height = this.map.length * this.tile_size;
        const firstRow: number[] | undefined = this.map[0];
        if (!firstRow) {
            throw new Error('map vide');
        }
        this.canvas.width = firstRow.length * this.tile_size;
        // Test
        const lootImage: HTMLImageElement | null = document.querySelector('img#loot-image');
        if (lootImage) {
            for (let i = 0; i < 10; i++) {
                this.loots.push(new Loot(
                    this,
                    Math.floor(Math.random() * this.canvas.width),
                    Math.floor(Math.random() * this.canvas.height),
                    20,
                    lootImage
                ));
            }
        }


        // Tests
        this.enemys.push(new Guardian(59, 290, this.dropLoot, this.player.arrows));
        this.enemys.push(new Slime(59, 320, this.dropLoot, this.player.arrows));

        this.update(0);
    }

    draw(): void {
        const tileMapImage: HTMLImageElement | null = this.canvas.querySelector('img#tile-map');
        if (!tileMapImage) {
            throw new Error('Tile map introuvable');
        }
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Contexte de canvas null');
        }
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dessiner la carte
        for (let y = 0; y < this.map.length; y++) {
            const currentRow = this.map[y];
            if (!currentRow) {
                throw new Error('pas de currentRow')
            }
            for (let x = 0; x < currentRow.length; x++) {
                const currentCase: number | undefined = currentRow[x];
                if (!currentCase) {
                    throw new Error('current case indéfinie');
                }
                ctx.drawImage(
                    tileMapImage,
                    this.tile_size * currentCase,
                    0,
                    this.tile_size,
                    this.tile_size,
                    x * this.tile_size,
                    y * this.tile_size,
                    this.tile_size,
                    this.tile_size
                );
            }
        }

        this.player.draw(ctx);

        this.loots.forEach((loot: Loot): void => {
            loot.draw(ctx);
        });

        this.enemys.forEach((enemy: Enemy): void => enemy.draw(ctx));

        this.player.arrows.forEach((arrow: Arrow): void => arrow.draw(ctx));

        this.ath.draw();
    }

    update(timestamp: Timestamp): void {
        const deltaTime: Timestamp = timestamp - this.lastTimestamp;
        console.log('update Player...')
        this.player.update(
            deltaTime,
            this.inputs,
            this.loots
        );
        console.log('update Player: ok')
        this.enemys.forEach((enemy: Enemy): void => enemy.update(deltaTime));
        this.enemys = this.enemys.filter((enemy) => !enemy.isDead);
        this.player.arrows.forEach((arrow: Arrow): void => arrow.update(deltaTime))

        this.draw();

        this.lastTimestamp = timestamp;
        requestAnimationFrame((timestamp) => this.update(timestamp));
    }

    dropLoot(x: number, y: number, value: number): void {
        const lootImage: HTMLImageElement | null = document.querySelector('img#loot-image');
        if (!lootImage) {
            throw new Error('Image des loot introuvable');
        }
        this.loots.push(new Loot(this, x, y, value, lootImage));
    }
}