# Référencement local — WIP ATHLETICS

*Établi le 01/09/2026, après analyse d'une salle concurrente non affiliée bien
classée sur les requêtes du milieu (brosfit.fr, La Chaussée-Saint-Victor / Blois).*

---

## Le principe, en une phrase

**Une salle ne gagne pas les requêtes de sa catégorie sur sa page : elle les gagne
sur son entité.** Vérifié en démontant le concurrent analysé — son site ne porte le
nom de la marque déposée du milieu que 7 fois sur 12 pages, jamais dans un `<title>`,
jamais dans un H1, jamais dans une URL. Ce qui le classe, c'est ce que le reste du
web dit de lui : sa fiche Google Business, le texte de ses 35 avis, quatre annuaires
spécialisés et une plateforme de réservation.

Conséquence pour WIP : **le site est fait, l'essentiel du travail est ailleurs.**
Le tableau ci-dessous est l'ordre d'impact réel, pas l'ordre de facilité.

| # | Chantier | Où | Effort | Impact | Quand |
|---|---|---|---|---|---|
| 1 | Fiche Google Business | hors site | 2 h + suivi | ●●●●● | **dès que l'adresse est occupée** |
| 2 | Les 30 premiers avis | hors site | protocole | ●●●●● | J+1 à J+30 |
| 3 | Annuaires et citations | hors site | 3 h | ●●●○○ | J-30 |
| 4 | Bloc « Le vocabulaire » | site | ✅ fait le 01/09 | ●●●○○ | — |
| 5 | Données structurées | site | ✅ fait le 01/09 | ●●○○○ | — |
| 6 | Axe HYROX | les deux | continu | ●●●●○ | maintenant |

---

## 1. NAP de référence — à recopier caractère pour caractère

Un référencement local se casse sur une virgule. Le nom, l'adresse et le téléphone
(**N**ame **A**ddress **P**hone) doivent être rigoureusement identiques partout :
Google recoupe ces trois chaînes pour décider que deux mentions parlent du même
établissement. « 1329 chemin du Roi » et « 1329 Chemin du Roi » passent ; un numéro
saisi une fois sur deux au format international ne passe pas.

```
WIP Athletics
1329 chemin du Roi
37400 Amboise
07 80 33 53 21
bonjour@wipathletics.fr
https://wipathletics.fr/
```

- **Nom** : « WIP Athletics ». Jamais « WIP Athletics Amboise », jamais
  « WIP Athletics — cross-training & Hyrox ». Bourrer le champ nom est la
  première cause de suspension d'une fiche Google Business, et c'est un signalement
  qu'un concurrent peut déclencher en trois clics.
- **Téléphone** : `07 80 33 53 21` à l'affichage, `+33780335321` dans tout champ
  technique (JSON-LD, annuaires qui demandent le format international).
- **Site** : avec le `https://` et le slash final, pour correspondre au canonique.

---

## 2. Fiche Google Business — le chantier n° 1

C'est 60 à 70 % du référencement local d'une salle. Le pack local (les trois fiches
avec la carte, au-dessus des résultats classiques) se joue là, pas sur la page.

**À créer dès que le bâtiment est physiquement occupé**, pas le 31 octobre : une
fiche a besoin de plusieurs semaines pour se stabiliser, et Google propose un statut
« ouvre prochainement » prévu exactement pour ça, avec la date d'ouverture.

**Catégories.** Le sélecteur de l'interface Google Business fait autorité — la liste
change et aucune liste recopiée sur un blog n'est fiable. Y chercher, dans cet ordre :

- **Principale** : `Salle de sport`
- **Secondaires** : `Centre de remise en forme`, `Coach sportif`, `École de danse`
  (pour le studio pole), et tout libellé de type « salle d'haltérophilie » que le
  sélecteur propose.

⚠️ **§5 bis-A s'applique intégralement ici.** Si le sélecteur propose une catégorie
portant le nom de la marque déposée du milieu, **ne pas la prendre** — c'est
précisément l'endroit où les titulaires de marque vont regarder, et une catégorie
n'est pas un usage descriptif défendable. Le coût est faible : les catégories
génériques ci-dessus couvrent les mêmes requêtes.

**À remplir sans en sauter un :**

- [ ] Description (750 signes) — reprendre le premier paragraphe de la page, avec
      « Amboise » et « Indre-et-Loire » dedans
- [ ] Date d'ouverture : **31/10/2026**, statut « ouvre prochainement »
- [ ] Horaires (lun–ven 6 h 30–22 h, sam 8 h–18 h) avec `validFrom` au 31/10
- [ ] Attributs : accès PMR, parking gratuit, vestiaires, douches, wifi
- [ ] Services : reprendre les 6 entrées du `hasOfferCatalog` du JSON-LD, mot pour mot
- [ ] **Zone de chalandise** : Amboise, Nazelles-Négron, Pocé-sur-Cisse, Vouvray,
      Montlouis-sur-Loire, Bléré, Château-Renault, Saint-Règle, Limeray, Tours
- [ ] 15 photos minimum, géolocalisées, prises au téléphone sur place —
      **pas les visuels de marque** : Google et les visiteurs veulent le lieu réel
- [ ] Lien de réservation → `https://wipathletics.fr/#reserver`
- [ ] Un post « Google Business » par semaine à partir de J-30 (ils expirent à 7 jours)
- [ ] Une fois la fiche validée : ajouter son URL dans le `sameAs` du JSON-LD
      (`index.html`, nœud `#salle`) et le `geo` relevé au clic droit sur Maps

---

## 3. Les 30 premiers avis — un actif, pas de la vanité

C'est le levier n° 2 et il est gratuit. Sur le concurrent analysé, ce sont **les avis
qui portent le vocabulaire du milieu** : « Super Box de crossfit », « Salle de Crossfit
de qualité », « Une box de crossfit au top ». Les adhérents écrivent le mot que les
gérants ne peuvent pas écrire, et Google lit le texte des avis pour qualifier
l'établissement.

**Protocole :**

1. Demander l'avis **en face à face, à la fin de la 2ᵉ ou 3ᵉ séance** — pas par SMS
   de masse, pas le jour de l'inscription.
2. Un QR code vers le lien direct d'avis, affiché en Zone Chill. Pas à l'accueil :
   on écrit un avis assis, pas debout en partant.
3. **Ne jamais souffler le texte ni le vocabulaire.** Un lot d'avis qui emploient les
   mêmes tournures est détecté, et l'effet s'inverse.
4. **Répondre à 100 % des avis sous 48 h**, y compris les 5 étoiles sans texte. La
   réponse est du contenu indexable que vous contrôlez, vous : c'est là que
   « cross-training », « Hyrox », « Amboise » se placent légitimement.
5. Objectif : **30 avis à J+60**, puis un rythme régulier. Une salle qui passe de
   0 à 40 avis en une semaine se fait filtrer.

---

## 4. Annuaires et citations

Ce sont eux qui portent le vocabulaire du milieu à votre place, et ils sont souvent
mieux balisés que les sites des salles elles-mêmes. Les quatre premiers sont ceux sur
lesquels le concurrent analysé est effectivement présent et classé.

| Annuaire | URL | Note |
|---|---|---|
| PagesJaunes | pagesjaunes.fr | Le plus gros poids. S'inscrire dans **toutes** les rubriques pertinentes |
| Ma Box de Cross | maboxdecross.fr | Annuaire de salles du milieu, pages « ville » déjà classées |
| Open Training | open-training.fr | Idem, maillage par ville |
| Salles de Sport .Fitness | sallesdesport.fitness | Recopie la fiche Google Business et la republie en `LocalBusiness` balisé |
| Google Maps / Apple Plans / Bing Places | — | Les trois cartes, pas seulement Google |
| Yelp, Foursquare, Waze | — | Faible trafic direct, mais ce sont des citations que Google recoupe |
| Office de tourisme du Val d'Amboise | — | Lien local à forte autorité, gratuit |
| Mairie d'Amboise — annuaire des associations et entreprises | — | Idem |
| **Répertoire officiel des salles affiliées HYROX** | hyrox.com | **Le plus qualifié de la liste** — à réclamer avec le pack de marque |

Règle : **le bloc NAP du § 1, à l'identique, à chaque inscription.**

---

## 5. Carte des mots-clés — 70 % HYROX, 30 % cross-training

L'arbitrage vient du droit autant que du marché. Sur le champ « cross-training », WIP
arrive derrière des salles installées **et** ne peut pas employer le mot que le public
tape le plus. Sur le champ HYROX, WIP est affiliée : le terrain est légitime,
défendable, et personne ne le tient encore en Indre-et-Loire.

**Axe prioritaire — HYROX (70 % de l'effort)**

| Requête visée | Où elle se joue |
|---|---|
| salle affiliée HYROX Amboise / Tours / Indre-et-Loire | Fiche GBP + bloc « Le vocabulaire » ✅ |
| préparation HYROX Tours | Section Hyrox + `memberOf` du JSON-LD ✅ |
| s'entraîner pour un HYROX débutant | À écrire — futur article/section |
| HYROX c'est quoi | Bloc « Le vocabulaire » ✅ + FAQ balisée ✅ |

**Axe secondaire — cross-training et local (30 %)**

| Requête visée | Où elle se joue |
|---|---|
| salle de sport Amboise | `<title>` ✅ + GBP |
| cross-training Amboise / Tours | H1 ✅ + `knowsAbout` ✅ |
| pole dance Amboise | Section espaces ✅ + catégorie GBP `École de danse` |
| haltérophilie Amboise | Bloc « Le vocabulaire » ✅ |
| c'est quoi le cross-training | FAQ balisée ✅ |
| différence cross-training / Hyrox | FAQ balisée ✅ |

**Le champ lexical, à employer partout sans réserve** — aucun de ces mots n'est
déposé, et ce sont eux qui rangent la salle dans la bonne catégorie aux yeux de
Google : *WOD, AMRAP, EMOM, benchmark, scaler, rig, box, PR, entraînement
fonctionnel, plateau, open gym, ski erg, sled, wall ball, arraché, épaulé-jeté.*

---

## 6. Ce que le site porte déjà (01/09/2026)

| Élément | État |
|---|---|
| `<title>` et description mesurés en pixels | ✅ 572 px / 870 px, entièrement visibles |
| Canonique, robots, sitemap | ✅ |
| `HealthClub` + `ExerciseGym` balisés | ✅ nettement au-dessus des concurrents locaux |
| `memberOf` → HYROX | ✅ ajouté le 01/09 — le rattachement d'entité |
| `knowsAbout` : 22 entrées dont le lexique | ✅ ajouté le 01/09 |
| `FAQPage` : 11 questions | ✅ dont 4 ajoutées le 01/09 |
| `Event` d'ouverture au 31/10 | ✅ |
| Section « 02 · Le vocabulaire » | ✅ ajoutée le 01/09 |
| `geo` (latitude / longitude) | ❌ **à relever sur Maps, clic droit sur la porte** |
| `sameAs` : fiche GBP, Facebook | ❌ à compléter dès leur création |
| Casse de la marque HYROX | ⚠️ « Hyrox » dans le texte courant, « HYROX » sur la mention d'affiliation. À harmoniser contre le pack de marque affilié |
| `aggregateRating` | ❌ impossible avant les premiers avis — **ne jamais l'inventer**, c'est une pénalité manuelle |

---

## Ce qu'on ne fait pas, et pourquoi

- **Écrire le nom de la marque déposée du milieu**, même suivi d'un ®, même dans une
  section comparative. C'est licite en droit (usage référentiel) et le concurrent
  analysé le fait. Mais le gain mesuré est faible — cette page-là ne lui rapporte
  qu'une requête informationnelle à faible intention — alors que la §5 bis-A est une
  règle absolue, écrite avant toute production, et que le champ lexical générique
  produit le même effet de catégorisation. **Arbitrage : non.** À rouvrir seulement
  si les positions ne bougent pas six mois après l'ouverture, et jamais sans conseil
  juridique.
- **Un `aggregateRating` avant d'avoir des avis.** Pénalité manuelle, perte de tous
  les résultats enrichis.
- **Bourrer le champ « nom » de la fiche Google Business.** Suspension.
- **Acheter des avis.** Détecté, et l'article L. 121-2 du code de la consommation en
  fait une pratique commerciale trompeuse.

---

*Ce document est le pendant hors-site de `index.html`. Le mettre à jour à chaque
chantier bouclé — c'est la seule trace de ce qui a été fait et de ce qui reste.*
