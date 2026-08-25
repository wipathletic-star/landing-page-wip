# Médias de la landing page — relevé de sources

**Mis à jour le 25/08/2026.**

---

## ⚠️ Quatre visuels PROVISOIRES à retirer avant la mise en ligne

Décision du 25/08/2026 : dérogation assumée aux **§5 ter** et **§6** du brand book
(« Interdits : photo de banque d'images ») pour la seule phase de maquette.

Ces images illustrent la section 03 « Quatre espaces ». Elles montrent **la salle de
quelqu'un d'autre sous les chiffres de WIP Athletics** (420 m², 6 barres, 4,20 m sous
plafond). Un visiteur croira voir la salle d'Amboise.

| Fichier | Espace | Source | Photographe |
|---|---|---|---|
| `provisoire-cf.jpg` | 25 · Cross-training & Hyrox | [Pexels 9958668](https://www.pexels.com/photo/9958668/) | Amar |
| `provisoire-pole.jpg` | 15 · Pole Dance & Aérien | [Pexels 6100294](https://www.pexels.com/photo/6100294/) | Aksioart |
| `provisoire-open.jpg` | 2.5 · Open Gym | [Pexels 1552252](https://www.pexels.com/photo/1552252/) | Leonmart |
| `provisoire-chill.jpg` | 5 · Zone Chill | [Pexels 28487270](https://www.pexels.com/photo/28487270/) | Juan Trevilla |

**Licence Pexels** — usage gratuit, commercial compris, attribution non exigée. Mais :
la revente de la photo telle quelle est interdite, et **une personne identifiable ne
peut pas être présentée d'une manière qui suggère qu'elle cautionne un produit ou un
service.**

> ⚠️ `provisoire-pole.jpg` montre **une personne identifiable**. La poser sur la page
> d'une salle de sport laisse entendre qu'elle y pratique ou y enseigne. C'est le
> visuel le plus exposé des quatre : à retirer en priorité.

### Comment tout retirer d'un coup

Dans `index.html`, décommenter la ligne signalée dans le bloc
« VISUELS PROVISOIRES » du CSS :

```css
.wip-photo[data-provisoire] img { display: none !important; }
```

Les quatre cadres redeviennent des emplacements portant leur brief de prise de vue.
Aucune autre modification n'est nécessaire.

### Traitement appliqué

Redimensionnées à 1200 px de large, désaturées à 55 % et réencodées en JPEG qualité 80
pour les rapprocher de la charte photo (§5 ter : désaturation, grain conservé) et les
homogénéiser entre elles.

---

## Médias définitifs — à conserver

| Fichier | Contenu | Origine | En page ? |
|---|---|---|---|
| `lieu-avant-01.jpg` | Le hangar avant travaux, charpente et verrières | Photo interne, janvier 2026 | ⚠️ non — voir ci-dessous |
| `lieu-avant-02.jpg` | Vue en longueur du bâtiment avant travaux | Photo interne, janvier 2026 | ⚠️ non — voir ci-dessous |
| `wip-hero.mp4` | Fond vidéo du hero | `WIP AthleticV2.mp4`, source interne | oui |

Les deux photos du lieu sont **authentiques** et ne posent aucun problème de droits ni
de véracité.

> **25/08/2026 — la section « En ce moment » a été supprimée** à la demande du user.
> C'était le seul endroit où ces deux photos étaient affichées. Les fichiers sont
> conservés ici, prêts à resservir.
>
> Conséquence à connaître : **la page n'affiche plus aucune image réelle de WIP
> Athletics.** Les quatre visuels de la section 03 sont des photos de banque d'images
> provisoires (voir plus haut). Le jour où elles seront retirées, la page n'aura plus
> de photo du tout tant que le shooting n'aura pas eu lieu.

### ⚠️ `wip-hero.mp4` — 75,8 Mo pour 66 secondes

Fonctionne en local, **inexploitable en ligne** (environ deux minutes d'attente en 4G).
À réencoder : boucle de 8 à 12 s, 1920×1080, sans piste audio, cible ~2 Mo.

---

## Ce qui a été écarté, et pourquoi

| Fichier | Motif |
|---|---|
| `Projet Site web WIP2\image\pole-dance.jpg` | Rose et turquoise fluo, sourires posés face caméra. Contredit le §5 bis (« sobre, à l'opposé du rose/paillettes ») **et** le texte affiché à côté (« rideaux occultants »). |
| `Projet Site web WIP2\image\hyrox.jpg` | Événement HYROX officiel avec logos **PUMA et Therabody**. Viole « HYROX = certification, taille plafonnée » ; le pack de marque affilié n'est pas obtenu. |
| `Projet Site web WIP2\image\Salle.jpg` | La salle d'un autre, posée sous les chiffres de WIP. |
| `CaroKBSnatch.jpg` | Athlète de compétition, dossard, abdominaux dessinés. Contredit frontalement la cible que toute la page rassure (« Je n'ai jamais mis les pieds dans une salle », « J'ai 55 ans »). |
| `ChatGPT Image *.png`, `Gemini_Generated_*.jpg` | Images générées par IA — refusées au brief initial. |
| Pexels 32206376 (1er choix Zone Chill) | Deux affiches militantes lisibles au mur (« Women Rights Are Human Rights », « Stop Sexual Assault ») : messages de tiers que la marque n'a pas choisis. |

---

## La fenêtre qui se referme

Le chantier est le seul sujet photo qui **n'existera plus après le 31 octobre 2026**.
Les emplacements de la bande « Work in progress, au sens propre » attendent :
le sol coulé, les mains pendant les travaux, la façade avec l'enseigne posée.

Les deux photos du lieu déjà en page sont des photos prises au téléphone : une fois
traitées à la charte, elles tiennent parfaitement. Le matériel n'est pas le sujet.
