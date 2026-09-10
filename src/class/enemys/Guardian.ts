import {Enemy} from "./Enemy.js";
import { Arrow } from "../shoots/Arrow.js";

export class Guardian extends Enemy {
    constructor(x: number, y: number, dropLoot: Function, shoots: Arrow[]) {
        const guardianImage: HTMLImageElement | null = document.querySelector('img#guardian-img');
        if (!guardianImage) {
            throw new Error('Image du gardien introuvable');
        }

        super(
            x, y, 
            20, 30,
            50,
            30,
            guardianImage,
            dropLoot,
            shoots
        )
    }

    protected move (deltaTime: number): void {}
}