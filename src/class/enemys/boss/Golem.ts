import {type Point, type Rect, getCorners, toRect, getImage, extractImgFromSprite, Vector2D, dist, choice } from "../../../functions.js";

import { Boss, type BossPhase } from "./Boss.js";
import type { LootConstructor } from "../../loots/Loot.js";
import { Player } from "../../Player.js";

export class Golem extends Boss<Golem> {
    private isMoving: boolean = false;
    private readonly speed = 0.01; // px / ms

    constructor(
        x: number,
        y: number,
        public readonly room: Rect,
        dropLootFunc: (lootConstructor: LootConstructor, x: number, y: number, value: number) => void,
        player: Player
    ) {
        const img = getImage("golem-sprite");
        const phaseConfig = {
            initialPhase: () => new Phase1(),
            transitions: [
                {healthPercent: 0.5, createPhase: () => new Phase2()}
            ]
        };
        super(
            x, y,
            130, 130,
            50,
            extractImgFromSprite(img, 0, 0, 100, 100),
            {gold: 100, mana: 30},
            dropLootFunc,
            phaseConfig,
            player
        );
    }

    public moveTo(point: Point, deltaTime: number): void {
        if (this.isMoving) return;

        let v = new Vector2D(point.x - this.x, point.y - this.y)
        v = v.normalize().amplify(deltaTime * this.speed);
        this.x += v.x;
        this.y += v.y;
    }
}

class Phase1 implements BossPhase<Golem> {
    name = "Phase 1"

    update(boss: Golem, deltaTime: number): void {
        this.move(boss, deltaTime);
    }

    enter(_boss: Golem) {}

    move(boss: Golem, deltaTime: number) {
        const corners = getCorners(boss.room);
        const [topLeft, topRight, bottomRight, bottomLeft] = corners;
        let bestCorner = topLeft;
        let bestDistance = dist(boss.getRect(), toRect(bestCorner));
        corners.forEach(corner => {
            const d = dist(boss.getRect(), toRect(corner))
            if (d < bestDistance) {
                bestCorner = corner;
                bestDistance = d;
            }
        });
        const around: Point[] = bestCorner === topLeft
            ? [topRight, bottomLeft]
            : bestCorner === topRight
                ? [topLeft, bottomRight]
                : bestCorner === bottomRight
                    ? [topRight, bottomLeft]
                    : [topLeft, bottomRight];
        boss.moveTo(choice(around), deltaTime);
    }
}

class Phase2 implements BossPhase<Golem> {
    name =  "Phase 2"

    update(boss: Golem): void {
        this.move(boss);
    }

    enter(_boss: Golem) {}

    move(_boss: Golem) {

    }
}