import { getImage, collides, assertDefined, Vector2D} from '../functions.js';

import { Entity } from './Entity.js';
import { Shoot } from './shoots/Shoots.js';
import { Arrow } from './shoots/Arrow.js';
import { FireBall } from './shoots/FireBall.js';
import { Inputs } from './Inputs.js';
import { Loot } from './loots/Loot.js';
import { Environnement } from './Environnement/Environnement.js';

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
};

type ShootConstructor<T extends Shoot> = new (x: number, y: number, dir: number) => T

type MapRow = readonly [number, ...number[]];
type Map = readonly [MapRow, ...MapRow[]];

export class Player extends Entity{
    private readonly SPEED = 0.1; // pixels / ms

    private readonly INITIAL_HEALTH = 10;

    private readonly SPRITE_WIDTH = 1600;
    private readonly SPRITE_HEIGHT = 1520;
    private readonly sprite: HTMLImageElement;

    private cooldown = 0;

    public gold = 0;
    public mana = 0;
    public health = this.INITIAL_HEALTH;

    public shoots: Shoot[] = [];

    constructor(
        private readonly initial_x: number,
        private readonly initial_y: number,
        private readonly map: Map,
        private readonly tile_size: number
    ) {
        super(initial_x, initial_y, 20, 25);

        this.sprite = getImage('player-sprite');
    }

    public update(deltaTime: number, inputs: Inputs, loots: Loot[], environnements: Environnement[]): void {
        this.move(deltaTime, inputs.keys, this.map, this.tile_size, environnements);

        loots.forEach((loot: Loot): void => {
            if (this.collides(loot.getRect())) {
                loot.pickup(this);
            }
        });

        if (inputs.keys['1'] && this.cooldown === 0) {
            this.throwShoot(Arrow, this.getDir(inputs.getMousePos()));
        } else if (inputs.keys['2'] && this.cooldown === 0) {
            this.throwShoot(FireBall, this.getDir(inputs.getMousePos()));
        } else {
            this.cooldown -= deltaTime;
            if (this.cooldown < 0) {
                this.cooldown = 0;
            }
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const frame = 3;
        ctx.drawImage(
            this.sprite,
            this.SPRITE_WIDTH * frame,
            0,
            this.SPRITE_WIDTH,
            this.SPRITE_HEIGHT,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    public hurt (damage: number): void {
        this.health -= damage;
        if (this.health <= 0) {
            this.die();
        }
    }

    private move(deltaTime: number, keys: {[keys: string]: boolean}, map: Map, tile_size: number, environnements: Environnement[]): void {
        let v: Vector2D = new Vector2D(0, 0);

        if (keys['ArrowUp'] || keys['w'])
            { v.y -= 1; }
        if (keys['ArrowDown'] || keys['s'])
            { v.y += 1; }
        if (keys['ArrowLeft'] || keys['a'])
            { v.x -= 1; }
        if (keys['ArrowRight'] || keys['d'])
            { v.x += 1; }

        v = v.normalize().amplify(this.SPEED * deltaTime);

        if (!this.isCollidingWall(this.x + v.x, this.y, map, tile_size, environnements)) {
            this.x += v.x;
        }
        if (!this.isCollidingWall(this.x, this.y + v.y, map, tile_size, environnements)) {
            this.y += v.y;
        }
    }

    private getDir(mousePos: {x: number, y: number}): number {
        const playerCenter = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };

        const dx = mousePos.x - playerCenter.x
        const dy = mousePos.y - playerCenter.y

        return Math.atan2(dy, dx);
    }

    private throwShoot<T extends Shoot>(shootClass: ShootConstructor<T>, dir: number): void {
        const shoot = new shootClass(this.x, this.y, dir);
        this.cooldown = shoot.cooldown;
        this.shoots.push(shoot);
    }

    private die(): void {
        this.health = this.INITIAL_HEALTH;
        this.x = this.initial_x;
        this.y = this.initial_y;
        this.cooldown = 0;
    }

    private isCollidingWall(x: number, y: number, map: Map, tile_size: number, environnements: Environnement[]): boolean {
        for (let i = 0; i < environnements.length; i++) {
            const env = environnements[i];
            assertDefined(env, "Env n'existe pas!");
            if (collides({x, y, w: this.width, h: this.height}, env.getRect())) {
                return true;
            }
        }

        const leftTile = Math.floor(x / tile_size);
        const rightTile = Math.ceil((x + this.width) / tile_size) - 1;
        const upTile = Math.floor(y / tile_size);
        const bottomTile = Math.ceil((y + this.height) / tile_size) - 1;

        const firstRow = map[0];
        if (bottomTile >= map.length || rightTile >= firstRow.length) {
            return true;
        }

        for (let row = upTile; row <= bottomTile; row++) {
            for (let col = leftTile; col <= rightTile; col++) {
                if (row < 0 || col < 0 || row >= map.length || col >= firstRow.length) {
                    return true;
                }
                const currentRow = map[row]!;
                if (currentRow[col] === 1) {
                    return true;
                }
            }
        }

        return false;
    }

    private collides(rect: Rect): boolean {
        if (this.x + this.width < rect.x) {
            return false;
        }
        if (this.x > rect.x + rect.w) {
            return false;
        }
        if (this.y + this.height < rect.y) {
            return false;
        }
        if (this.y > rect.y + rect.h) {
            return false;
        }
        return true;
    }
}