import { getImage } from "../usefull/functions.js";
import { dist, Vector2D } from "../usefull/geometry.js";
import { Loot } from "./loots/Loot.js";
import { GoldBag } from "./loots/GoldBag.js";
import { ManaBottle } from "./loots/ManaBottle.js";
import { Guardian } from "./enemys/Guardian.js";
import { Slime } from "./enemys/Slime.js";
import { Player } from "./Player.js";
import { Inputs } from "./Inputs.js";
import { BaseEnemy } from "./enemys/BaseEnemy.js";
import { ATH } from "./ATH.js";
import { Shoot } from "./shoots/Shoots.js";
import { PNJ } from "./PNJs/PNJ.js";
import { Knight } from "./PNJs/Knight.js";
import { Pnj1 } from "./PNJs/Pnj1.js";
import { AudioManager } from "./AudioManager.js";
import { BreakableWall } from "./Environnement/BreakableWall.js";
import { FireBall } from "./shoots/FireBall.js";
import { Environnement } from "./Environnement/Environnement.js";
import { Lamp } from "./Environnement/Lamp.js";
import { Boss } from "./enemys/boss/Boss.js";
import { Golem } from "./enemys/boss/Golem.js";
export class Game {
    canvas;
    map;
    tile_size;
    player;
    inputs;
    audioManager;
    MAX_DIALOG_DIST = 120;
    ath;
    loots = [];
    enemys = [];
    pnjs = [];
    environnements = [];
    isPaused = false; // Rendre privé à la fin des tests
    lastTimestamp;
    isDialoging = false;
    dialogs = [];
    currentDialogIndex = 0;
    dialoger = { x: 0, y: 0, w: 0, h: 0 };
    constructor(canvas, map, tile_size, player, inputs, audioManager) {
        this.canvas = canvas;
        this.map = map;
        this.tile_size = tile_size;
        this.player = player;
        this.inputs = inputs;
        this.audioManager = audioManager;
        this.environnements.push(new Lamp(40, 250));
        this.ath = new ATH(this.canvas, this.player, this.environnements.filter(env => env instanceof Lamp), this.inputs);
        // this.dropGoldBag = this.dropGoldBag.bind(this);
        this.dropLootFunc = this.dropLootFunc.bind(this);
        this.lastTimestamp = 0;
    }
    init() {
        this.canvas.height = this.map.length * this.tile_size;
        const firstRow = this.map[0];
        this.canvas.width = firstRow.length * this.tile_size;
        // Test
        for (let i = 0; i < 5; i++) {
            this.loots.push(new GoldBag(this, Math.floor(Math.random() * this.canvas.width), Math.floor(Math.random() * this.canvas.height), 20));
        }
        for (let i = 0; i < 5; i++) {
            this.loots.push(new ManaBottle(this, Math.floor(Math.random() * this.canvas.width), Math.floor(Math.random() * this.canvas.height), 5));
        }
        // Tests
        this.enemys.push(new Guardian(59, 290, this.dropLootFunc, this.player));
        this.enemys.push(new Slime(59, 240, this.dropLootFunc, this.player, new Vector2D(59, 240), new Vector2D(59, 300)));
        this.pnjs.push(new Knight(59, 220, 20, 25, this, this.inputs));
        this.pnjs.push(new Pnj1(20, 160, 15, 20, this, this.inputs));
        console.log(new BreakableWall(4 * this.tile_size, 10 * this.tile_size, this.tile_size));
        this.environnements.push(new BreakableWall(4 * this.tile_size, 10 * this.tile_size, this.tile_size));
        this.environnements.push(new BreakableWall(4 * this.tile_size, 11 * this.tile_size, this.tile_size));
        this.enemys.push(new Golem(64, 18 * 32, { x: 64, y: 18 * 32, w: 17 * 32, h: 160 }, this.dropLootFunc, this.player));
        // Lancer la boucle de jeu
        this.update(0);
    }
    draw() {
        const tileMapImage = getImage('tile-map');
        const ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Contexte de canvas null');
        }
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Dessiner la carte
        for (let y = 0; y < this.map.length; y++) {
            const currentRow = this.map[y];
            for (let x = 0; x < currentRow.length; x++) {
                const currentCase = currentRow[x];
                ctx.drawImage(tileMapImage, this.tile_size * currentCase, 0, this.tile_size, this.tile_size, x * this.tile_size, y * this.tile_size, this.tile_size, this.tile_size);
            }
        }
        this.environnements.forEach(env => env.draw(ctx));
        this.player.draw(ctx);
        this.pnjs.forEach(pnj => {
            pnj.draw(ctx);
        });
        this.loots.forEach(loot => {
            loot.draw(ctx);
        });
        this.enemys.forEach((enemy) => enemy.draw(ctx));
        this.player.shoots.forEach((shoot) => shoot.draw(ctx));
        this.ath.draw(this.enemys.filter(e => e instanceof Boss), this.isPaused, this.environnements.filter(env => env instanceof FireBall), this.isDialoging, this.dialogs, this.currentDialogIndex);
    }
    update(timestamp) {
        const deltaTime = timestamp - this.lastTimestamp;
        if (this.inputs.keysJustPressed['p']) {
            this.isPaused = !this.isPaused;
        }
        if (this.isDialoging && dist(this.player.getRect(), this.dialoger) > this.MAX_DIALOG_DIST) {
            this.isDialoging = false;
        }
        if (!this.isPaused) {
            this.player.update(deltaTime, this.inputs, this.loots, this.environnements);
            this.environnements.forEach(env => {
                if (env instanceof BreakableWall) {
                    const collidingFb = env.collidesFireBall(this.player.shoots.filter(shoot => shoot instanceof FireBall));
                    if (collidingFb) {
                        this.environnements = this.environnements.filter(env2 => env2 !== env);
                        this.player.shoots = this.player.shoots.filter(shoot => shoot !== collidingFb);
                    }
                }
            });
            this.pnjs.forEach(pnj => pnj.update());
            this.enemys.forEach(enemy => enemy.update(deltaTime));
            this.enemys = this.enemys.filter((enemy) => !enemy.isDead);
            this.player.shoots.forEach(shoot => shoot.update(deltaTime));
            this.ath.update(this.isDialoging, this);
        }
        this.inputs.update();
        this.audioManager.update(this.player.getRect());
        this.draw();
        this.lastTimestamp = timestamp;
        requestAnimationFrame((timestamp) => this.update(timestamp));
    }
    dialog(dialoger, dialogs) {
        this.isDialoging = true;
        this.dialogs = dialogs;
        this.currentDialogIndex = 0;
        this.dialoger = dialoger;
    }
    nextDialog() {
        this.currentDialogIndex++;
        if (this.currentDialogIndex >= this.dialogs.length) {
            this.isDialoging = false;
        }
    }
    dropLootFunc(lootConstructor, x, y, value) {
        this.loots.push(new lootConstructor(this, x, y, value));
    }
}
