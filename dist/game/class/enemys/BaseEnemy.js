import { dist } from "../../usefull/geometry.js";
import { Entity } from "../Entity.js";
export class BaseEnemy extends Entity {
    health;
    image;
    dropLootFunc;
    isDead = false;
    constructor(x, y, width, height, health, image, dropLootFunc) {
        super(x, y, width, height);
        this.health = health;
        this.image = image;
        this.dropLootFunc = dropLootFunc;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    collides(rect) {
        return dist(this.getRect(), rect) === 0;
    }
}
