import { getImage, assertDefined } from '../usefull/functions.js';
import { dist, Vector2D } from '../usefull/geometry.js';
import { Entity } from './Entity.js';
import { Shoot } from './shoots/Shoots.js';
import { Arrow } from './shoots/Arrow.js';
import { FireBall } from './shoots/FireBall.js';
import { Inputs } from './Inputs.js';
import { Loot } from './loots/Loot.js';
import { Environnement } from './Environnement/Environnement.js';
export class Player extends Entity {
    map;
    tile_size;
    SPEED = 0.1; // pixels / ms
    INITIAL_HEALTH = 10;
    SPRITE_WIDTH = 1600;
    SPRITE_HEIGHT = 1520;
    sprite;
    cooldown = 0;
    gold = 0;
    mana = 0;
    health = this.INITIAL_HEALTH;
    shoots = [];
    constructor(x, y, map, tile_size) {
        super(x, y, 20, 25);
        this.map = map;
        this.tile_size = tile_size;
        this.sprite = getImage('player-sprite');
    }
    update(deltaTime, inputs, loots, environnements) {
        this.move(deltaTime, inputs.keys, this.map, this.tile_size, environnements);
        loots.forEach((loot) => {
            if (this.collides(loot.getRect())) {
                loot.pickup(this);
            }
        });
        if (inputs.keys['1'] && this.cooldown === 0) {
            this.throwShoot(Arrow, this.getDir(inputs.getMousePos()));
        }
        else if (inputs.keys['2'] && this.cooldown === 0) {
            this.throwShoot(FireBall, this.getDir(inputs.getMousePos()));
        }
        else {
            this.cooldown -= deltaTime;
            if (this.cooldown < 0) {
                this.cooldown = 0;
            }
        }
    }
    draw(ctx) {
        const frame = 3;
        ctx.drawImage(this.sprite, this.SPRITE_WIDTH * frame, 0, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.x, this.y, this.width, this.height);
    }
    hurt(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.die();
        }
    }
    move(deltaTime, keys, map, tile_size, environnements) {
        let v = new Vector2D(0, 0);
        if (keys['ArrowUp'] || keys['w']) {
            v.y -= 1;
        }
        if (keys['ArrowDown'] || keys['s']) {
            v.y += 1;
        }
        if (keys['ArrowLeft'] || keys['a']) {
            v.x -= 1;
        }
        if (keys['ArrowRight'] || keys['d']) {
            v.x += 1;
        }
        v = v.normalize().amplify(this.SPEED * deltaTime);
        if (!this.isCollidingWall(this.x + v.x, this.y, map, tile_size, environnements)) {
            this.x += v.x;
        }
        if (!this.isCollidingWall(this.x, this.y + v.y, map, tile_size, environnements)) {
            this.y += v.y;
        }
    }
    getDir(mousePos) {
        const playerCenter = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
        const dx = mousePos.x - playerCenter.x;
        const dy = mousePos.y - playerCenter.y;
        return Math.atan2(dy, dx);
    }
    throwShoot(shootClass, dir) {
        const shoot = new shootClass(this.x, this.y, dir);
        this.cooldown = shoot.cooldown;
        this.shoots.push(shoot);
    }
    die() {
        window.location.href = '../pages/death_menu.php';
        /*
        this.health = this.INITIAL_HEALTH;
        this.x = this.initial_x;
        this.y = this.initial_y;
        this.cooldown = 0;
        */
    }
    isCollidingWall(x, y, map, tile_size, environnements) {
        for (let i = 0; i < environnements.length; i++) {
            const env = environnements[i];
            assertDefined(env, "Env n'existe pas!");
            if (dist({ x, y, w: this.width, h: this.height }, env.getRect()) === 0) {
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
                const currentRow = map[row];
                if (currentRow[col] === 1) {
                    return true;
                }
            }
        }
        return false;
    }
    collides(rect) {
        return dist(this.getRect(), rect) === 0;
    }
}
