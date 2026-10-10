<?php
require_once '../config.php';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shop - Rogue-lite</title>
    <link rel="stylesheet" href="../css/shop.css">
    <script>
        const gold: number = <?=$_SESSION['gold']?>;
    </script>
</head>
<body>
    <h1>Magasin</h1>
    <div><?=$_SESSION['gold']?> or</div>
    <ul>
        <li>
            <h3>Cape</h3>
            <img src="../assets/img/slime.png" alt="">
            <p>Elle permet de se déplacer plus rapidement</p>
        </li>
        <li>
            <h3>+2 Force</h3>
            <img src="../assets/img/slime.png" alt="">
            <p>Plus de force pour un guerrier sans peur</p>
        </li>
        <li>
            <h3>+1 PV</h3>
            <img src="../assets/img/slime.png" alt="">
            <p>Même les plus valeureux peuvent se blesser</p>
        </li>
        <li>
            <h3>Attaque</h3>
            <img src="../assets/img/slime.png" alt="">
            <p>Une nouvelle manière de taper ses ennemis</p>
        </li>
        <li>
            <h3>Potion</h3>
            <img src="../assets/img/potion.png" alt="">
            <p>On dit qu'elle a des vertus guerissantes</p>
        </li>
    </ul>
</body>
</html>