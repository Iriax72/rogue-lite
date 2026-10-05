import {type Point, type Rect, getCorners, getImage, extractImgFromSprite, Vector2D, choice } from "../../../functions.js";

import { Boss, type BossPhase } from "./Boss.js";
import type { LootConstructor } from "../../loots/Loot.js";
import { Player } from "../../Player.js";

export class Golem extends Boss<Golem> {
    private readonly speed = 0.06; // px / ms
    private targetCornerIndex: number | null = null;

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

    private moveTo(point: Point, deltaTime: number): boolean {
        const direction = new Vector2D(point.x - this.x, point.y - this.y);
        const remainingDistance = direction.length();
        const distanceToMove = deltaTime * this.speed;

        if (remainingDistance <= distanceToMove) {
            this.x = point.x;
            this.y = point.y;
            return true;
        }

        const movement = direction.normalize().amplify(distanceToMove);
        this.x += movement.x;
        this.y += movement.y;
        return false;
    }

    public override update(deltaTime: number): void {
        super.update(deltaTime);
        if (!this.isDead) {
            this.move(deltaTime);
        }
    }

    private move(deltaTime: number): void {
        const corners = getCorners(this.room);
        if (this.targetCornerIndex === null) {
            const golemPosition = this.getRect();
            let nearestCornerIndex = 0;
            let nearestDistance = Number.POSITIVE_INFINITY;
            corners.forEach((corner, index) => {
                const distance = Math.hypot(corner.x - golemPosition.x, corner.y - golemPosition.y);
                if (distance < nearestDistance) {
                    nearestCornerIndex = index;
                    nearestDistance = distance;
                }
            });
            this.targetCornerIndex = this.chooseAdjacentCorner(nearestCornerIndex);
        }

        const targetCorner = corners[this.targetCornerIndex]!;
        if (this.moveTo(targetCorner, deltaTime)) {
            this.targetCornerIndex = this.chooseAdjacentCorner(this.targetCornerIndex);
        }
    }

    private chooseAdjacentCorner(currentCornerIndex: number): number {
        return choice([
            (currentCornerIndex + 1) % 4,
            (currentCornerIndex + 3) % 4
        ]);
    }
}

class Phase1 implements BossPhase<Golem> {
    name = "Phase 1"

    update(): void {}

    enter(_boss: Golem) {}
}

class Phase2 implements BossPhase<Golem> {
    name =  "Phase 2"

    update(): void {}

    enter(_boss: Golem) {}
}