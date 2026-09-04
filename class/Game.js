export class Game {
    canvas;
    map;
    TILE_SIZE = 32;

    constructor(canvas, map) {
        this.canvas = canvas;
        this.map = map;
    }

    init() {
        this.canvas.height = this.map.length * this.TILE_SIZE;
        this.canvas.width = this.map[0].length * this.TILE_SIZE;
        this.draw();
    }

    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let x = 0; x < this.map.length; x++) {
            for (let y = 0; y < this.map[0].length; y++) {
                ctx.fillStyle = this.map[x][y] ? "#000" : "#777";
                ctx.fillRect(x * this.TILE_SIZE, y * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE);
            }
        }
    }
}