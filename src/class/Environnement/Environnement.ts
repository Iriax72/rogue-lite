import { Entity } from "../Entity.js";
import {BreakableWall} from "./BreakableWall.js";

export abstract class Environnement extends Entity {
    constructor(
        x: number, y: number,
        width: number, height: number,
        private readonly img: HTMLImageElement
    ) {
        super(x, y, width, height);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        if (this instanceof BreakableWall) {
            console.log("breakablewall draw !")
        }
    }
}