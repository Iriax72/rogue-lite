import { assertDefined, getImage } from "../functions.js";

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
    public loots: Loot[] = [];
    private enemys: Enemy[] = []

    private lastTimestamp: Timestamp;

    constructor(
        private canvas: HTMLCanvasElement,
        private map: number[][],
        private tile_size: number,
        private player: Player,
        private inputs: Inputs,
        private ath: ATH
    ) {
        this.dropLoot = this.dropLoot.bind(this);
        this.lastTimestamp = 0;
    }

    public init(): void {
        this.canvas.height = this.map.length * this.tile_size;
        const firstRow: number[] | undefined = this.map[0];
        assertDefined(firstRow, 'map vide');
        this.canvas.width = firstRow.length * this.tile_size;
        // Test
        const lootImage = getImage('loot-image');
        for (let i = 0; i < 10; i++) {
            this.loots.push(new Loot(
                this,
                Math.floor(Math.random() * this.canvas.width),
                Math.floor(Math.random() * this.canvas.height),
                20,
                lootImage
            ));
        }


        // Tests
        this.enemys.push(new Guardian(59, 290, this.dropLoot, this.player));
        this.enemys.push(new Slime(59, 240, this.dropLoot, this.player));

        this.update(0);
    }

    private draw(): void {
        const tileMapImage = getImage('tile-map');

        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Contexte de canvas null');
        }
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dessiner la carte
        for (let y = 0; y < this.map.length; y++) {
            const currentRow = this.map[y];
            assertDefined(currentRow, 'pas de currentRow');
            for (let x = 0; x < currentRow.length; x++) {
                const currentCase: number | undefined = currentRow[x];
                assertDefined(currentCase, 'current case indéfinie');
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

    private update(timestamp: Timestamp): void {
        const deltaTime: Timestamp = timestamp - this.lastTimestamp;
        
        this.player.update(
            deltaTime,
            this.inputs,
            this.loots
        );
        this.enemys.forEach((enemy: Enemy): void => enemy.update(deltaTime));
        this.enemys = this.enemys.filter((enemy) => !enemy.isDead);
        this.player.arrows.forEach((arrow: Arrow): void => arrow.update(deltaTime))

        this.draw();

        this.lastTimestamp = timestamp;
        requestAnimationFrame((timestamp) => this.update(timestamp));
    }

    private dropLoot(x: number, y: number, value: number): void {
        this.loots.push(new Loot(this, x, y, value, getImage('loot-image')));
    }
}