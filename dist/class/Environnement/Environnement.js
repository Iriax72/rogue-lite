import { Entity } from "../Entity.js";
export class Environnement extends Entity {
    img;
    constructor(x, y, width, height, img) {
        super(x, y, width, height);
        this.img = img;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
