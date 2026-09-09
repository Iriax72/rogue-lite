import {Arrow} from './shoots/Arrow.js';
import { Inputs } from './Inputs.js';
import { Loot } from './loots/Loot.js';

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
}

type Vector2d = {
    x: number,
    y: number
}

export class Player {
    x: number;
    y: number;
    map: number[][];
    tile_size: number;
    WIDTH = 20;
    HEIGHT = 25;
    SPEED = 0.1; // pixels / ms
    gold = 0;
    health = 10;
    cooldown = 0;
    arrows: Arrow[] = [];
    sprite: HTMLImageElement = document.querySelector('img#player-sprite');
    SPRITE_WIDTH = 1600;
    SPRITE_HEIGHT = 1520;

    constructor(x: number, y: number, map: number[][], tile_size: number) {
        this.x = x;
        this.y = y;
        this.map = map;
        this.tile_size = tile_size
    }

    update(deltaTime: number, inputs: Inputs, loots: Loot[]): void {
        this.move(deltaTime, inputs.keys, this.map, this.tile_size);

        loots.forEach((loot: Loot): void => {
            if (this.collides({
                x: loot.x,
                y: loot.y,
                w: loot.WIDTH,
                h: loot.HEIGHT
            })) {
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

    draw(ctx: CanvasRenderingContext2D): void {
        const frame = 3;
        ctx.drawImage(
            this.sprite,
            this.SPRITE_WIDTH * frame,
            0,
            this.SPRITE_WIDTH,
            this.SPRITE_HEIGHT,
            this.x,
            this.y,
            this.WIDTH,
            this.HEIGHT
        );
    }

    move(deltaTime: number, keys: {[keys: string]: boolean}, map: number[][], tile_size: number): void {
        let v: Vector2d = {x: 0, y: 0};

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

    throwArrow(dir: number): void {
        this.arrows.push(new Arrow(this.x, this.y, dir, 3));
    }

    isCollidingWall(x: number, y: number, map: number[][], tile_size: number): boolean {
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

        return false;
    }

    collides(rect: Rect): boolean {
        if (this.x + this.WIDTH < rect.x) {
            return false;
        }
        if (this.x > rect.x + rect.w) {
            return false;
        }
        if (this.y + this.HEIGHT < rect.y) {
            return false;
        }
        if (this.y > rect.y + rect.h) {
            return false;
        }
        return true;
    }
}