import { Entity } from "../Entity.js";
export class Shoot extends Entity {
    dir;
    strength;
    speed;
    image;
    soundEffect;
    constructor(x, y, width, height, dir, strength, speed, // pixel / ms
    image, soundEffect) {
        super(x, y, width, height);
        this.dir = dir;
        this.strength = strength;
        this.speed = speed;
        this.image = image;
        this.soundEffect = soundEffect;
        this.soundEffect.play();
    }
    update(deltaTime) {
        this.x += Math.cos(this.dir) * deltaTime * this.speed;
        this.y += Math.sin(this.dir) * deltaTime * this.speed;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.dir);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}
