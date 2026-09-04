export class Game {
    canvas;
    map;
    player;
    inputs;
    TILE_SIZE = 32;

    constructor(canvas, map, player, inputs) {
        this.canvas = canvas;
        this.map = map;
        this.player = player;
        this.inputs = inputs
    }

    init() {
        this.canvas.height = this.map.length * this.TILE_SIZE;
        this.canvas.width = this.map[0].length * this.TILE_SIZE;

        this.update(0);
    }

    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dessiner la carte
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                ctx.fillStyle = this.map[y][x] ? "#000" : "#777";
                ctx.fillRect(x * this.TILE_SIZE, y * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE);
            }
        }
        // Dessiner le joueur
        ctx.fillStyle = "#f00";
        ctx.fillRect(this.player.x, this.player.y, this.player.WIDTH, this.player.HEIGHT);
    }

    update(timestamp) {
        if (!this.lastTimestamp)
            { this.lastTimestamp = timestamp; }
        const deltaTime = timestamp - this.lastTimestamp;
        
        this.player.update(deltaTime, this.inputs.getKeys());
        this.draw();

        this.lastTimestamp = timestamp;
        requestAnimationFrame((timestamp) => this.update(timestamp));
    }
}