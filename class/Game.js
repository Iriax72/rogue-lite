import {Loot} from "./loots/Loot.js";
import {Guardian} from "./enemys/Guardian.js";
import {Slime} from "./enemys/Slime.js";

export class Game {
    canvas;
    map;
    player;
    inputs;
    loots = [];
    enemys = []
    tile_size;
    ath;
    // Test
    slimeImg = document.querySelector('img#slime-img');

    constructor(canvas, map, tile_size, player, inputs, ath) {
        this.canvas = canvas;
        this.map = map;
        this.tile_size = tile_size;
        this.player = player;
        this.inputs = inputs;
        this.ath = ath;
        this.dropLoot = this.dropLoot.bind(this);
    }

    init() {
        this.canvas.height = this.map.length * this.tile_size;
        this.canvas.width = this.map[0].length * this.tile_size;

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

    draw() {
        const tileMapImage = this.canvas.querySelector('img#tile-map');
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dessiner la carte
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                // ctx.fillStyle = this.map[y][x] ? "#000" : "#777";
                // ctx.fillRect(x * this.tile_size, y * this.tile_size, this.tile_size, this.tile_size);
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
        // Dessiner le joueur
        ctx.fillStyle = "#f00";
        ctx.fillRect(this.player.x, this.player.y, this.player.WIDTH, this.player.HEIGHT);
        // Dessiner les loots
        this.loots.forEach((loot) => {
            loot.draw(ctx);
        });
        this.enemys.forEach((enemy) => enemy.draw(this.canvas));
        this.player.arrows.forEach((arrow) => arrow.draw(this.canvas));
        // Dessiner l'ath
        this.ath.draw();
    }

    update(timestamp) {
        if (!this.lastTimestamp)
            { this.lastTimestamp = timestamp; }
        const deltaTime = timestamp - this.lastTimestamp;
        
        this.player.update(
            deltaTime,
            this.inputs,
            this.loots
        );
        this.enemys.forEach((enemy) => enemy.update(deltaTime));
        this.enemys = this.enemys.filter((enemy) => !enemy.isDead);
        this.player.arrows.forEach((arrow) => arrow.update(deltaTime))
        this.draw();

        this.lastTimestamp = timestamp;
        requestAnimationFrame((timestamp) => this.update(timestamp));
    }

    dropLoot(x, y, value) {
        this.loots.push(new Loot(this, x, y, value, document.querySelector('img#loot-image')));
    }
}