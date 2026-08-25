# WIP ATHLETICS — Master logo v02

**21/08/2026 — VERSION DE RÉFÉRENCE.** Remplace la v01 (conservée dans `logos\v01\`).

## Ce qui change depuis la v01

**Un seul changement : ATHLETICS est porté de 9,6 % à 14 % de la hauteur de lettre**
(capitale 96 → 140 unités), sur validation du 21/08/2026.

Conséquence de composition : à cette taille, l'endossement ne tient plus dans le creux sous la
panse du « p » — il faudrait 1 341 unités là où il n'y en a que 929. Le lockup a donc été
recomposé : **ATHLETICS passe sous le wordmark, toujours calé à droite sur le bord de la panse**.
L'approche est conservée (~0,14 em), le dessin du wordmark est strictement inchangé.

Gain mesuré : le lockup complet devient lisible dès **160 px** au lieu de 240 px, et **45 mm**
au lieu de 65 mm.

---

## Quel fichier utiliser

| Besoin | Fichier |
|---|---|
| Usage courant, tous supports | `wip-logo-principal-*.svg` (wip + ATHLETICS) |
| Support où la signature a du sens (affiche, page d'accueil, dos de t-shirt) | `wip-logo-signature-*.svg` |
| Petite taille, bandeau étroit, broderie poitrine | `wip-wordmark-*.svg` (wip seul) |
| Favicon, avatar, patch, manche, écusson | `wip-symbole-*.svg` (le w seul) |
| Icône d'app / onglet navigateur | `png/wip-favicon-512.png`, `wip-favicon-32.png`, `wip-apple-touch-icon-180.png` |
| Photo de profil réseaux sociaux | `wip-avatar-*.svg` (carré) ou `wip-avatar-rond-*.svg` |

Suffixes : sans suffixe = `currentColor` (prend la couleur du texte parent, idéal en SVG inline
dans une page web) · `-noir` = `#0B0D0C` · `-blanc` = `#FFFFFF`.

---

## Tailles minimales (mesurées, pas estimées)

| Support | Lockup complet | Wordmark seul | Symbole seul |
|---|---|---|---|
| Écran | ≥ 160 px de large | 90 → 160 px | < 90 px |
| Impression | ≥ 45 mm de large | 22 → 45 mm | < 22 mm |

> En dessous de ces seuils, **retirer ATHLETICS** plutôt que de le laisser devenir une tache grise.

---

## Zone de protection

Marge libre minimale sur les quatre côtés = **la largeur d'un fût** (455 unités, soit 45,5 % de
la hauteur de lettre). Voir `wip-zone-de-protection.svg`. Aucun texte, filet, bord de photo ou
autre logo dans cette zone.

---

## Construction

Voir `wip-construction.svg`. Grille : hauteur de lettre = 1000 unités, ligne de base y = 1000.

| Paramètre | Valeur |
|---|---|
| Fût (les 5 verticales) | 455 |
| Contre-forme du w | 300 |
| Profondeur de contre-forme | 680 |
| Approche entre lettres | 64 |
| Jambage du p | 1090 · bas de panse 872 |
| Largeur totale du wordmark | 4000 — soit **4:1** sur la hauteur de lettre |
| Chanfreins extérieurs | 45° (1:1) |
| Diagonale d'encoche du w | 4:3 |
| Talon bas-gauche | R 224 |
| Congés secondaires | R 45 · R 48 · R 10 |
| ATHLETICS | capitale 140, approche 0,14 em, calé à droite sur x = 3990, ligne de base y = 1285 |
| Signature | capitale 263, justifiée sur 0 → 4000, ligne de base y = 1682 |

---

## Interdits

- Déformer, étirer, incliner, faire pivoter.
- Recomposer le lockup (déplacer ATHLETICS ou la signature).
- Contourer, ombrer, appliquer un dégradé ou un effet.
- Poser sur une photo sans contraste suffisant — utiliser la version blanche sur fond assombri.
- Réutiliser les anciens fichiers `Vectorize-*.svg` ou `Logo Wip-Photoroom.svg`.

---

## Notes techniques

- Tracés réellement vectoriels, **54 nœuds** pour l'ensemble du wordmark.
- Enroulements corrects (extérieurs horaires, contre-forme du p inverse) : compatible
  *nonzero* comme *evenodd*, et avec les logiciels de découpe, de piquage et de sérigraphie.
- ATHLETICS et la signature sont vectorisés depuis **Archivo** (SIL Open Font License,
  usage en logo autorisé). Ce sont des contours : aucune dépendance à une police installée.
- Le master est **généré** depuis sa grille — voir `source/`.

## Point resté ouvert

**™ / ®** — non repris tant que le statut de dépôt de la marque n'est pas connu. Un ™ affiché
alors que la marque est déposée à l'INPI devrait être un ®, et l'inverse serait trompeur.
