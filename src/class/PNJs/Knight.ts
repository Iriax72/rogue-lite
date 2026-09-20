import { getImage } from "../../functions.js";

import { PNJ } from "./PNJ.js";
import { Game } from "../Game.js";
import { Inputs } from "../Inputs.js";

export class Knight extends PNJ {
    constructor(x: number, y: number, width: number, height: number, game: Game, inputs: Inputs) {
        super(x, y, width, height, getImage('knight-img'), game, inputs, [
            "Salutation, voyageur...",
            "Je suis le chevalier gris, craint et redouté par mes ennemis !",
            "Veux-tu mon épée ? Je te la cède pour 200 pièces d'or."
        ]);
    }
}