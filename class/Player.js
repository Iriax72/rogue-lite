import {Arrow} from './shoots/Arrow.js';

export class Player {
    x;
    y;
    map;
    tile_size;
    WIDTH = 10;
    HEIGHT = 16;
    SPEED = 0.1; // pixels / ms
    gold = 0;
    cooldown = 0;
    arrows = [];

    constructor(x, y, map, tile_size) {
        this.x = x;
        this.y = y;
        this.map = map;
        this.tile_size = tile_size
    }

    update(deltaTime, inputs, loots) {
        this.move(deltaTime, inputs.keys, this.map, this.tile_size);

        loots.forEach((loot) => {
            if (this.collides(
                loot.x,
                loot.y,
                loot.WIDTH,
                loot.HEIGHT
            )) {
                loot.pickup(this);
            }
        });

        if (inputs.mouse.down && this.cooldown === 0) {
            this.cooldown = 2000; // ms

            const playerCenter = {
                x: this.x + this.WIDTH / 2,
                y: this.y + this.HEIGHT / 2
            };

            const dy = inputs.mouse.y - playerCenter.y;
            const dx = inputs.mouse.x - playerCenter.x;

            const dir = Math.atan2(dy, dx);
            this.throwArrow(dir);
        } else {
            this.cooldown -= deltaTime;
            if (this.cooldown < 0) {
                this.cooldown = 0;
            }
        }
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

    throwArrow(dir) {
        this.arrows.push(new Arrow(this.x, this.y, dir));
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

    collides(x, y, w, h) {
        if (this.x + this.WIDTH < x) {
            return false;
        }
        if (this.x > x + w) {
            return false;
        }
        if (this.y + this.HEIGHT < y) {
            return false;
        }
        if (this.y > y + h) {
            return false;
        }
        return true;
    }
}