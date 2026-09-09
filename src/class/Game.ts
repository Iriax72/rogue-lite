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
    slimeImg: HTMLImageElement = document.querySelector('img#slime-img');

    constructor(canvas: HTMLCanvasElement, map: number[][], tile_size: number, player: Player, inputs: Inputs, ath: ATH) {
        this.canvas = canvas;
        this.map = map;
        this.tile_size = tile_size;
        this.player = player;
        this.inputs = inputs;
        this.ath = ath;
        this.dropLoot = this.dropLoot.bind(this);
    }

    init(): void {
        this.canvas.height = this.map.length * this.tile_size;
        this.canvas.width = this.map[0].length * this.tile_size;
        // Test
        for (let i = 0; i < 10; i++) {
            this.loots.push(new Loot(
                this,
                Math.floor(Math.random() * this.canvas.width),
                Math.floor(Math.random() * this.canvas.height),
                20,
                document.querySelector('#loot-image')
            ));
        }

        // Tests
        this.enemys.push(new Guardian(59, 290, this.dropLoot, this.player.arrows));
        this.enemys.push(new Slime(59, 320, this.dropLoot, this.player.arrows));

        this.update(0);
    }

    draw(): void {
        const tileMapImage: HTMLImageElement = this.canvas.querySelector('img#tile-map');
        const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dessiner la carte
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                ctx.drawImage(
                    tileMapImage,
                    this.tile_size * this.map[y][x],
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
        if (!this.lastTimestamp)
            { this.lastTimestamp = timestamp; }
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
        this.loots.push(new Loot(this, x, y, value, document.querySelector('img#loot-image')));
    }
}