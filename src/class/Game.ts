import { getImage, dist} from "../functions.js";

// import { Entity } from "./Entity.js";
import { Loot } from "./loots/Loot.js";
import {GoldBag} from "./loots/GoldBag.js";
import { ManaBottle } from "./loots/ManaBottle.js";
import {Guardian} from "./enemys/Guardian.js";
import {Slime} from "./enemys/Slime.js";
import {Player} from "./Player.js";
import {Inputs} from "./Inputs.js";
import {Enemy} from "./enemys/Enemy.js";
import {ATH} from "./ATH.js";
import { Shoot } from "./shoots/Shoots.js";
import { PNJ } from "./PNJs/PNJ.js";
import { Knight } from "./PNJs/Knight.js";
import { Pnj1 } from "./PNJs/Pnj1.js";

type Timestamp = number;

type MapRow = readonly [number, ...number[]];
type Map = readonly [MapRow, ...MapRow[]];

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
};

export class Game {
    public readonly MAX_DIALOG_DIST = 60;

    public loots: Loot[] = [];
    private enemys: Enemy[] = [];
    private pnjs: PNJ[] = [];

    public isPaused: boolean = false; // Rendre privé à la fin des tests
    private lastTimestamp: Timestamp;

    private isDialoging: boolean = false;
    private dialogs: string[] = [];
    private currentDialogIndex: number = 0;
    private dialoger: Rect = {x: 0, y: 0, w: 0, h: 0};

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly map: Map,
        private readonly tile_size: number,
        public readonly player: Player,
        private readonly inputs: Inputs,
        public readonly ath: ATH
    ) {
        this.dropGoldBag = this.dropGoldBag.bind(this);
        this.lastTimestamp = 0;
    }

    public init(): void {
        this.canvas.height = this.map.length * this.tile_size;
        const firstRow = this.map[0];
        this.canvas.width = firstRow.length * this.tile_size;
        // Test
        for (let i = 0; i < 5; i++) {
            this.loots.push(new GoldBag(
                this,
                Math.floor(Math.random() * this.canvas.width),
                Math.floor(Math.random() * this.canvas.height),
                20
            ));
        }
        for (let i = 0; i < 5; i++) {
            this.loots.push(new ManaBottle(
                this,
                Math.floor(Math.random() * this.canvas.width),
                Math.floor(Math.random() * this.canvas.height),
                5
            ))
        }


        // Tests
        this.enemys.push(new Guardian(59, 290, this.dropGoldBag, this.player));
        this.enemys.push(new Slime(59, 240, this.dropGoldBag, this.player));

        this.pnjs.push(new Knight(50, 200, 20, 25, this, this.inputs));
        this.pnjs.push(new Pnj1(20, 160, 15, 20, this, this.inputs));

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
            const currentRow = this.map[y]!;
            for (let x = 0; x < currentRow.length; x++) {
                const currentCase = currentRow[x]!;
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

        this.pnjs.forEach(pnj => {
            pnj.draw(ctx);
        })

        this.loots.forEach(loot => {
            loot.draw(ctx);
        });

        this.enemys.forEach((enemy: Enemy): void => enemy.draw(ctx));

        this.player.shoots.forEach((shoot: Shoot): void => shoot.draw(ctx));

        if (this.isDialoging) {
            this.ath.draw(this.isPaused, true, this.dialogs, this.currentDialogIndex);
        } else {
            this.ath.draw(this.isPaused, false);
        }
    }

    private update(timestamp: Timestamp): void {
        const deltaTime: Timestamp = timestamp - this.lastTimestamp;

        if (this.inputs.keysJustPressed['p']) {
            this.isPaused = !this.isPaused;
        }

        if (this.isDialoging && dist(this.player.getRect(), this.dialoger) > this.MAX_DIALOG_DIST) {
            this.isDialoging = false;
        }

        if (!this.isPaused) {
            this.player.update(
                deltaTime,
                this.inputs,
                this.loots
            );
            this.pnjs.forEach(pnj => pnj.update());
            this.enemys.forEach(enemy => enemy.update(deltaTime));
            this.enemys = this.enemys.filter((enemy) => !enemy.isDead);
            this.player.shoots.forEach(shoot => shoot.update(deltaTime));
            this.ath.update(this.isDialoging, this);
        }
        this.inputs.update();

        this.draw();

        this.lastTimestamp = timestamp;
        requestAnimationFrame((timestamp) => this.update(timestamp));
    }

    public dialog(dialoger: Rect, dialogs: string[]) {
        this.isDialoging = true;
        this.dialogs = dialogs;
        this.currentDialogIndex = 0;
        this.dialoger = dialoger;
    }

    public nextDialog(): void {
        this.currentDialogIndex++;
        if (this.currentDialogIndex > this.dialogs.length) {
            this.isDialoging = false;
        }
    }

    private dropGoldBag(x: number, y: number, value: number): void {
        this.loots.push(new GoldBag(this, x, y, value));
    }
}