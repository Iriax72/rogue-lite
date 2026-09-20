import { collides, dist } from "../../functions.js";

import { Entity } from "../Entity.js";
import { ATH } from "../ATH.js";
import { Player } from "../Player.js";
import { Inputs } from "../Inputs.js";
import { getImage } from "../../functions.js";

export class PNJ extends Entity {
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        private readonly img: HTMLImageElement,
        private readonly player: Player,
        private readonly ATH: ATH,
        private readonly inputs: Inputs,
        private readonly dialog: string[]
    ) {
        super(x, y, width, height);
    }

    public update(deltaTime: number): void {
        const mousePos = this.inputs.getMousePos();
        if (
            dist(this.getRect(), this.player.getRect()) <= 60
            && this.inputs.mouse.down
            && collides(this.getRect(), {
                x: mousePos().x,
                y: mousePos().y,
                w: 0,
                h: 0
            })
        ) {
            this.ATH.dialog(this.dialog);
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}