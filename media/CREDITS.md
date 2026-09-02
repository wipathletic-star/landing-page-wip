# Médias de la landing page — relevé de sources

**Mis à jour le 28/08/2026.**

> Les visuels préfixés `provisoire-` sont des **images de maquette** : elles servent à juger
> le rendu des composants, pas à être publiées. Les photos définitives seront prises par le
> user ou par une équipe. Ce document sert à retrouver une source, à rejouer un traitement,
> et à garder trace des critères de sélection — pas à surveiller une mise en ligne.

---

## Section 05 — carrousel « En images » *(28/08/2026)*

Six vues pour couvrir les trois registres demandés : la salle, l'ambiance communautaire,
les adhérents en effort.

| Fichier | Sujet | Source | Photographe |
|---|---|---|---|
| `provisoire-vie-01.jpg` | Le plateau, vu de l'entrée | [Pexels 6796964](https://www.pexels.com/photo/6796964/) | Dimkidama |
| `provisoire-vie-02.jpg` | Mur de matériel, wall balls et haltères | [Pexels 6389513](https://www.pexels.com/photo/6389513/) | Tima Miroshnichenko |
| `provisoire-vie-03.jpg` | Cours collectif, le coach corrige | [Pexels 6339494](https://www.pexels.com/photo/6339494/) | Pavel Danilyuk |
| `provisoire-vie-04.jpg` | Effort au rameur, contre-jour | [Pexels 6389079](https://www.pexels.com/photo/6389079/) | Tima Miroshnichenko |
| `provisoire-vie-05.jpg` | Récupération en groupe | [Pexels 6339358](https://www.pexels.com/photo/6339358/) | Pavel Danilyuk |
| `provisoire-vie-06.jpg` | Gainage au medicine ball | [Pexels 13993704](https://www.pexels.com/photo/13993704/) | Kuiyibo |

**Traitement** : recadrage 3:2 à 1400 × 933, ancrage réglé image par image, saturation 52 %,
contraste +5 %, noirs relevés au gamma, grain fin ajouté, JPEG q82 progressif. Les six sources
avaient des lumières très différentes ; le traitement les fait tenir comme une série.
Script `vie.py`. Poids total 1 046 ko, seule la première image chargée d'emblée.

**Écartés au contrôle en haute résolution** — utile pour le brief du shooting, ce sont les
mêmes pièges qu'on retrouvera sur le terrain :

| Candidat | Motif |
|---|---|
| Pexels 9958669 | Le logo d'une autre box peint au mur (« Building Human Machines ») |
| Pexels 37972529 | Maillots de club identiques sur tout le monde, décor d'événement |
| Pexels 5646011 | Deux logos Under Armour lisibles ; grimace de douleur qui va contre le message adressé au débutant |
| Pexels 6389067 | Image verticale : le recadrage 3:2 ne gardait qu'un anneau perdu dans le vide |
| Pexels 6551057 | Le 3:2 coupait la tête — cadrage isolant une partie du corps, interdit §5 ter |

---

## Section 06 — trois portraits de coachs *(26/08/2026)*

| Fichier | Fiche | Source | Photographe |
|---|---|---|---|
| `provisoire-coach-seb.jpg` | 01 · Sébastien | [Pexels 36085104](https://www.pexels.com/photo/36085104/) | Alef Morais |
| `provisoire-coach-simon.jpg` | 02 · Simon | [Pexels 18060115](https://www.pexels.com/photo/18060115/) | Marcus Chan Media |
| `provisoire-coach-pole.jpg` | 03 · Coach pole | [Pexels 37575705](https://www.pexels.com/photo/37575705/) | Svet Svet |

**Pourquoi ces trois-là** : aucun sourire posé face caméra, aucun cadrage isolant une partie
du corps, aucun athlète de compétition. Le portrait pole est habillé, en studio clair, sans
rose ni paillettes — c'est le parti pris du §5 bis (« la pole se différencie par l'axe de
graisse, pas par une couleur »). Écartés en cours de sélection : deux poses pole tête en bas
(visage illisible, abdominaux au premier plan), un décor de Noël, un décor d'Halloween
(§5 quater), et un haltérophile en compétition portant des logos PUMA.

**Traitement** : recadrage 3:4 centré, 900 × 1200, saturation 45 %, noirs relevés au gamma,
JPEG q≈85. Trois lumières d'origine très différentes (chaude / contre-jour N&B / studio
froid), ramenées à une série.

---

## Section 01 — quatre fonds d'espace *(25/08/2026)*

| Fichier | Espace | Source | Photographe |
|---|---|---|---|
| `provisoire-cf.jpg` | 25 · Cross-training & Hyrox | [Pexels 9958668](https://www.pexels.com/photo/9958668/) | Amar |
| `provisoire-pole.jpg` | 15 · Pole Dance & Aérien | [Pexels 6100294](https://www.pexels.com/photo/6100294/) | Aksioart |
| `provisoire-open.jpg` | 2.5 · Open Gym | [Pexels 1552252](https://www.pexels.com/photo/1552252/) | Leonmart |
| `provisoire-chill.jpg` | 5 · Zone Chill | [Pexels 28487270](https://www.pexels.com/photo/28487270/) | Juan Trevilla |

**26/08/2026 — passées du cadre au filigrane de fond**, à la demande du user : arrière-plan
de l'espace ouvert, 30 % d'opacité, 72 % de désaturation, dans la bande centrale que le texte
laisse libre.

**Traitement** : 1200 px de large, désaturation 55 %, JPEG q80.

---

## L'interrupteur de retrait

Les visuels de maquette sont marqués `[data-provisoire]` et préfixés `provisoire-`. Pour
basculer la page en mode « sans photo » — utile pour juger la mise en page seule, ou le jour
où les vraies photos arrivent — décommenter ces trois lignes dans le bloc
« VISUELS PROVISOIRES » du CSS :

```css
[data-provisoire] img { display: none !important; }
.wip-equipe-vignettes button i { display: block !important; }
.wip-espace-note b, .wip-coach-note b { display: none !important; }
```

Les fonds d'espace, les portraits et le carrousel se vident, les vignettes de l'équipe
reprennent leurs initiales, et le badge bleu s'efface. **Les briefs de prise de vue restent
affichés** — ce sont des outils de production pour le shooting.

*(Sélecteur élargi de `.wip-photo[data-provisoire]` à `[data-provisoire]` le 26/08/2026 : ni
les vignettes de l'équipe, ni les fonds d'espace, ni le cadre du carrousel ne sont des
`.wip-photo`.)*

---

## Médias définitifs

| Fichier | Contenu | Origine | En page ? |
|---|---|---|---|
| `og-wip-athletics.jpg` | Image de partage social 1200 × 630 | Composée le 27/08/2026 — 100 % marque | oui (balises `og:` / `twitter:`) |
| `lieu-avant-01.jpg` | Le hangar avant travaux, charpente et verrières | Photo interne, janvier 2026 | non |
| `lieu-avant-02.jpg` | Vue en longueur du bâtiment avant travaux | Photo interne, janvier 2026 | non |
| `wip-hero.mp4` | Fond vidéo du hero | `WIP AthleticV2.mp4`, source interne | oui |

### `og-wip-athletics.jpg`

Lockup du master v02, Archivo, palette §3, chanfrein 45° du §5. Rien d'emprunté.

Remplace `logo/png/wip-avatar-1000.png`, qui était carré : les réseaux le recadraient en
bandeau et tronquaient le logo. 1200 × 630 est le format qu'ils déforment le moins.

Régénération : script `og.py` (Pillow). Deux pièges consignés dans `DESIGN_KNOWLEDGE.md` —
l'ordre des axes d'Archivo variable, et l'emplacement de la police sur ce poste.

> À refaire après le shooting : une photo réelle de la salle en fond, voilée, avec le même
> bandeau. Une image de partage typographique est un bon repli, pas un aboutissement.

### Les deux photos du lieu

Authentiques, prises au téléphone. La section « En ce moment » qui les affichait a été
supprimée le 25/08/2026 ; les fichiers sont conservés, prêts à resservir. Traitées à la
charte, elles tiennent parfaitement — le matériel n'est pas le sujet.

### `wip-hero.mp4` — 14,4 Mo *(réencodée le 25/08/2026)*

Le script ne pose le `src` que sur grand écran : un téléphone ne télécharge rien. Reste que
14 Mo sur une page qui devrait en peser deux, c'est le poste le plus lourd du site et un frein
mesurable aux Core Web Vitals. Cible si on veut aller au bout : boucle de 8 à 12 s,
1920 × 1080, sans piste audio, ~2 Mo. Exclue du crawl par `robots.txt`.

---

## Ce qui a été écarté, et pourquoi

Ces motifs valent aussi pour le shooting : ce sont les critères de la charte photo §5 ter.

| Fichier | Motif |
|---|---|
| `Projet Site web WIP2\image\pole-dance.jpg` | Rose et turquoise fluo, sourires posés face caméra. Contredit le §5 bis (« sobre, à l'opposé du rose/paillettes ») **et** le texte affiché à côté (« rideaux occultants »). |
| `Projet Site web WIP2\image\hyrox.jpg` | Événement HYROX officiel avec logos **PUMA et Therabody**. Viole « HYROX = certification, taille plafonnée » ; le pack de marque affilié n'est pas obtenu. |
| `Projet Site web WIP2\image\Salle.jpg` | La salle d'un autre, reconnaissable. |
| `CaroKBSnatch.jpg` | Athlète de compétition, dossard, abdominaux dessinés. Contredit frontalement la cible que toute la page rassure (« Je n'ai jamais mis les pieds dans une salle », « J'ai 55 ans »). |
| `ChatGPT Image *.png`, `Gemini_Generated_*.jpg` | Images générées par IA — refusées au brief initial. |
| Pexels 32206376 (1er choix Zone Chill) | Deux affiches militantes lisibles au mur : messages de tiers que la marque n'a pas choisis. |

---

## La fenêtre qui se referme

Le chantier est le seul sujet photo qui **n'existera plus après le 31 octobre 2026**.
Trois sujets attendent : le sol coulé, les mains pendant les travaux, la façade avec
l'enseigne posée.
