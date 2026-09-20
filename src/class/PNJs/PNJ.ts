import { collides, dist } from "../../functions.js";

import { Entity } from "../Entity.js";
import { Game } from "../Game.js";
import { Inputs } from "../Inputs.js";

export abstract class PNJ extends Entity {
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        private readonly img: HTMLImageElement,
        private readonly game: Game,
        private readonly inputs: Inputs,
        private readonly dialog: string[]
    ) {
        super(x, y, width, height);
    }

    public update(): void {
        const mousePos = this.inputs.getMousePos();
        if (
            dist(this.getRect(), this.game.player.getRect()) <= this.game.MAX_DIALOG_DIST
            && this.inputs.mouse.justDown
            && collides(this.getRect(), {
                x: mousePos.x,
                y: mousePos.y,
                w: 0,
                h: 0
            })
        ) {
            this.game.dialog(this.getRect(), this.dialog);
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}