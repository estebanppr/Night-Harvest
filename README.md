# Night Harvest — code source complet

Jeu 3D pour navigateur en JavaScript, HTML et CSS, avec Three.js r160.
Cette archive correspond à la version publiée contenant le bâtiment réorganisé,
la mini-carte, les cultures améliorables, les machines parallèles, le vieillissement,
les commandes clients, la sauvegarde locale et la fermeture automatique des menus.

## Lancer sur Windows

1. Extraire entièrement le ZIP dans un dossier.
2. Ouvrir ce dossier dans VS Code ou dans un terminal.
3. Avec Python 3 installé, exécuter :

   py -3 -m http.server 8000 --bind 127.0.0.1

4. Ouvrir http://localhost:8000 dans un navigateur disposant de WebGL.
5. Cliquer sur « Explorer » pour capturer la souris et activer les bruitages.

Sur macOS/Linux : `python3 -m http.server 8000 --bind 127.0.0.1`.
Arrêter le serveur avec Ctrl+C. Il faut un serveur HTTP local : ne pas simplement
ouvrir index.html par double-clic, car le jeu utilise des modules JavaScript.
Il n'y a pas d'installation npm ni de compilation à faire. Three.js est inclus.
Les polices Google nécessitent Internet ; des polices de remplacement sont prévues.

## Commandes

- ZQSD ou WASD : déplacement ; Maj : courir.
- Souris : tourner la tête ; E : interagir à portée.
- Échap : libérer la souris.
- Vue d'ensemble : glisser pour tourner, molette pour zoomer.
- Les actions finales ferment le menu. La plantation garde l'étape d'arrosage
  ouverte tant que l'irrigation automatique n'est pas achetée.

## Organisation du code

| Fichier | Rôle |
| --- | --- |
| index.html | Interface, compteurs, boutons et menus |
| style.css | Apparence, menus centrés et adaptation mobile |
| game.js | Initialisation, boucle de jeu, interactions et mini-carte |
| navigation.js | Caméra, capture de la souris et collisions |
| models.js | Plantes et équipements 3D détaillés |
| estate.js | Bâtiment, pièces, signalétique et disposition des ateliers |
| expansion.js | Machines achetables et écrans affichant leur progression |
| production.js | Capacités, prix, temps et production parallèle |
| career.js | Irrigation, rendement, vieillissement, commandes et sauvegarde |
| audio.js | Bruitages et ambiance synthétisés avec Web Audio |
| three.module.js | Moteur de rendu Three.js fourni sous licence MIT |

Les modèles sont construits par le code : il n'y a pas de fichiers Blender/FBX
séparés. Les sons sont synthétisés : il n'y a pas de fichiers audio séparés.
Pour régler les cultures, chercher `const crops` dans game.js.
Pour les tarifs et capacités des machines, modifier `catalog` dans production.js.
Les prix d'irrigation/terreau et les commandes sont dans career.js ; mettre aussi
à jour leurs libellés dans game.js si vous changez ces valeurs.

## Sauvegardes

La progression est enregistrée dans localStorage sous la clé
`night-harvest-estate-v1`, dans le navigateur utilisé. La version locale et la
version en ligne ont des sauvegardes distinctes. Changer de navigateur ou de port
ne réutilise pas automatiquement la même sauvegarde. Supprimer les données du
site efface la progression. Aucun compte ni serveur de sauvegarde n'est requis.

## Périmètre

C'est le code du jeu web, pas un projet Unity ni une application mobile native.
L'archive ne contient aucun identifiant de déploiement, jeton, historique Git ou
donnée de partie personnelle. Le code peut être modifié et hébergé comme site statique.

Version source : b267deeb81f487ce23bde3aa9da26168758d3a52.
La licence de Three.js est jointe dans THREE-LICENSE.txt.
