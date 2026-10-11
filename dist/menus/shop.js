const ds_gold = document.body.dataset['gold'];
if (ds_gold === undefined) {
    throw new Error('Le dataset de body ne fournit pas de valeur gold');
}
if (Number.isNaN(parseInt(ds_gold))) {
    throw new Error('La valeur gold dans le dataset du body n\'est pas un nombre');
}
const gold = parseInt(ds_gold);
console.log("l'or est: " + gold);
export {};
