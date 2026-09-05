export class Player {
    x;
    y;
    map;
    tile_size;
    WIDTH = 10;
    HEIGHT = 16;
    SPEED = 0.1; // pixels / ms
    gold = 0;

    constructor(x, y, map, tile_size) {
        this.x = x;
        this.y = y;
        this.map = map;
        this.tile_size = tile_size
    }

    update(deltaTime, keys) {
        this.move(deltaTime, keys, this.map, this.tile_size);
    }

    move(deltaTime, keys, map, tile_size) {
        let v = {x: 0, y: 0};

        if (keys['ArrowUp'] || keys['w'])
            { v.y -= 1; }
        if (keys['ArrowDown'] || keys['s'])
            { v.y += 1; }
        if (keys['ArrowLeft'] || keys['a'])
            { v.x -= 1; }
        if (keys['ArrowRight'] || keys['d'])
            { v.x += 1; }

        const length = Math.sqrt(v.x **2 + v.y **2);
        if (length > 0) {
            v.x /= length;
            v.y /= length;
        }

        v.x *= this.SPEED * deltaTime;
        v.y *= this.SPEED * deltaTime;

        if (!this.isCollidingWall(this.x + v.x, this.y, map, tile_size)) {
            this.x += v.x;
        }
        if (!this.isCollidingWall(this.x, this.y + v.y, map, tile_size)) {
            this.y += v.y;
        }
    }

    isCollidingWall(x, y, map, tile_size) {
        const leftTile = Math.floor(x / tile_size);
        const rightTile = Math.floor((x + this.WIDTH) / tile_size);
        const upTile = Math.floor(y / tile_size);
        const bottomTile = Math.floor((y + this.HEIGHT) / tile_size);

        for (let row = upTile; row <= bottomTile; row++) {
            for (let col = leftTile; col <= rightTile; col++) {
                if (row < 0 || col < 0 || row >= map.length || col >= map[0].length) {
                    return true;
                }
                if (map[row][col] === 1) {
                    return true;
                }
            }
        }

        return false
    }
}