import React, { useState, useEffect, useRef } from "react";

/**
 * WIP ATHLETICS — Work · Improve · Progress
 * Landing page — Amboise · ouverture samedi 31 octobre 2026
 *
 * DIRECTION (refonte design 24/08/2026 — structure, textes et idées inchangés)
 *
 * Socle = §3 du brand book : noir de fonte / magnésie / béton, un accent unique
 * (bleu de chauffe). Le code des disques olympiques calibrés est conservé — c'est
 * une idée revendiquée dans le texte de la page — mais ramené à sa juste place :
 * un repère à petite surface (l'anneau du disque, la pastille, le filet de
 * section), jamais un aplat de fond. Coïncidence utile : le disque de 20 kg est
 * bleu, donc l'accent de marque est aussi une couleur de disque.
 *
 * Typographie = §4 : Archivo sur toute son amplitude de chasse (wdth 62→125) et
 * de graisse, plus Martian Mono pour tout ce qui est chiffré (horaires, mesures,
 * durées) — le vocabulaire d'une salle est chiffré, la mono a un rôle avant
 * d'avoir un style.
 *
 * Grammaire = §5, la coupe diagonale : chanfrein 45° en bas à droite, talon
 * arrondi en bas à gauche, coupe d'image 4:3 (36,87°) toujours du même côté.
 * C'est ce qui rend la page reconnaissable sans son logo.
 *
 * Logos = MASTER v02 (brand/logos/v02/), seule version en vigueur — la v01 est
 * historique. Wordmark seul dans la nav (bandeau étroit), lockup complet en pied
 * de page, symbole en filigrane. Tracés repris tels quels, aucun nœud touché ;
 * les fichiers d'origine sont dans logo/ pour les autres supports.
 *
 * ⚠️ Le mot « CrossFit » n'apparaît nulle part (§5 bis-A) : la salle n'est pas
 * affiliée. Les parcours des coachs disent « box affiliée » sans nommer la marque.
 *
 * À compléter : photos (slots repérés), coach pole, tarifs définitifs,
 * lien de réservation, planning réel.
 */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Martian+Mono:wght@400;500;600&display=swap');

.wip {
  /* ——— socle §3 ——— */
  --fonte:    #0B0D0C;   /* noir de fonte */
  --magnesie: #ECEBE5;   /* blanc craie chaud, jamais un blanc pur */
  --papier:   #E3E2DA;   /* magnésie assombrie : fonds de section alternés */
  --beton-c:  #8B8E88;   /* texte secondaire SUR NOIR   — 5,9:1 */
  --beton-f:  #5E625C;   /* texte secondaire SUR CLAIR  — 5,2:1 */
  --encre:    #2A2D29;   /* texte courant sur clair, moins dur que le noir plein */
  --trait:    #D2D1C8;   /* filet sur clair */
  --trait-n:  #232620;   /* filet sur noir */

  /* accent unique : chaque fond appelle sa valeur */
  --bleu:     #1B44C8;   /* sur magnésie — 6,5:1 */
  --bleu-c:   #6A8AF0;   /* sur noir     — 6,1:1 */
  --chrome:   #B4B9BC;   /* matière pole, fond noir uniquement */

  /* disques calibrés — repérage uniquement, jamais un aplat de fond */
  --d25: #C0322C;
  --d20: #1B44C8;
  --d15: #E0A800;
  --d5:  #ECEBE5;
  --d2:  #0B0D0C;

  --display: 'Archivo', 'Helvetica Neue', Arial, sans-serif;
  --mono: 'Martian Mono', ui-monospace, 'SFMono-Regular', monospace;

  /* coupe diagonale §5 */
  --chanfrein: 15px;   /* 45° — blocs, boutons, étiquettes */
  --talon: 11px;       /* R du talon bas-gauche */
  --coupe-x: 60px;     /* coupe d'image 4:3 … */
  --coupe-y: 45px;     /* … 60/45 = 36,87° */
  --nav-h: 70px;

  background: var(--magnesie);
  color: var(--fonte);
  font-family: var(--display);
  font-size: 16px;
  line-height: 1.55;
  font-synthesis-weight: none;
  -webkit-font-smoothing: antialiased;
  position: relative;
  overflow-x: clip; /* 'hidden' casserait position:sticky sur la nav et le hero */
}

.wip *, .wip *::before, .wip *::after { box-sizing: border-box; }
.wip p, .wip h1, .wip h2, .wip h3, .wip h4, .wip ul, .wip li, .wip figure { margin: 0; padding: 0; }
.wip ul { list-style: none; }
.wip button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; }
.wip a { color: inherit; text-decoration: none; }
.wip p { text-wrap: pretty; }
.wip :focus-visible { outline: 2px solid var(--bleu); outline-offset: 3px; }
.wip section[id], .wip header[id] { scroll-margin-top: calc(var(--nav-h) + 12px); }

@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}

/* ——— grain : la matière du papier, pas un effet ——— */
.wip-grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 60; opacity: .42;
  mix-blend-mode: soft-light;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.wip-wrap { max-width: 1240px; margin: 0 auto; padding: 0 30px; }
@media (max-width: 620px) { .wip-wrap { padding: 0 20px; } }

/* ——— étiquette mono : tout ce qui est chiffré ou catégorisé ——— */
.wip-mono {
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: .1em; text-transform: uppercase; color: var(--beton-f);
  font-feature-settings: 'tnum' 1;
}

/* ——— régimes typographiques ——— */
.wip-h {
  font-family: var(--display); font-weight: 900; font-stretch: 118%;
  letter-spacing: -0.03em; line-height: .9; text-wrap: balance;
}

/* ——— la coupe : chanfrein bas-droit + talon bas-gauche ——— */
.wip-coupe {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--chanfrein)), calc(100% - var(--chanfrein)) 100%, 0 100%);
  border-bottom-left-radius: var(--talon);
}
.wip-coupe-l { --chanfrein: 30px; --talon: 18px; }

/* ———————————————————————————————— annonce ———————————————————————————————— */
.wip-annonce {
  background: var(--fonte); color: var(--beton-c);
  display: flex; justify-content: center; align-items: center;
  gap: 0; flex-wrap: wrap; padding: 10px 28px;
}
.wip-annonce span {
  font-family: var(--mono); font-size: 10px; font-weight: 400;
  letter-spacing: .11em; text-transform: uppercase;
  display: inline-flex; align-items: center; gap: 6px;
}
.wip-annonce span + span::before {
  content: ''; width: 1px; height: 11px; margin: 0 12px 0 18px;
  background: #3A3E38; transform: skewX(-36.87deg); /* la diagonale du logo */
}
.wip-annonce b { color: var(--magnesie); font-weight: 500; }

/* ———————————————————————————————— nav ———————————————————————————————— */
.wip-nav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(11,13,12,.93);
  -webkit-backdrop-filter: blur(14px) saturate(1.4);
  backdrop-filter: blur(14px) saturate(1.4);
  border-bottom: 1px solid var(--trait-n);
}
.wip-nav-in { display: flex; align-items: center; justify-content: space-between; height: var(--nav-h); gap: 20px; }

.wip-logo { display: inline-flex; align-items: center; color: var(--magnesie); }
.wip-logo-sig { display: block; width: 128px; height: auto; }
@media (max-width: 400px) { .wip-logo-sig { width: 104px; } }

.wip-liens { display: flex; gap: 28px; align-items: center; }
.wip-liens a {
  font-size: 14px; font-weight: 500; color: #B9BCB5; position: relative;
  padding: 4px 0; transition: color .2s ease;
}
.wip-liens a::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
  background: var(--bleu-c); transform: scaleX(0); transform-origin: right;
  transition: transform .3s cubic-bezier(.16,1,.3,1);
}
.wip-liens a:hover { color: var(--magnesie); }
.wip-liens a:hover::after { transform: scaleX(1); transform-origin: left; }

@media (max-width: 940px) {
  .wip { --nav-h: 108px; }
  .wip-nav-in { flex-wrap: wrap; height: auto; }
  .wip-logo, .wip-nav-in > .wip-cta { height: 64px; display: inline-flex; align-items: center; }
  .wip-liens {
    order: 3; width: 100%; gap: 22px; overflow-x: auto; padding-bottom: 12px;
    scrollbar-width: none; -webkit-overflow-scrolling: touch;
  }
  .wip-liens::-webkit-scrollbar { display: none; }
  .wip-liens a { white-space: nowrap; font-size: 13.5px; }
}

/* ———————————————————————————————— boutons ———————————————————————————————— */
.wip-cta, .wip-cta-fant {
  position: relative; overflow: hidden; isolation: isolate;
  display: inline-flex; align-items: center; gap: 11px;
  padding: 14px 22px; font-size: 14.5px; font-weight: 600; font-stretch: 105%;
  letter-spacing: -.005em;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--chanfrein)), calc(100% - var(--chanfrein)) 100%, 0 100%);
  border-bottom-left-radius: var(--talon);
  transition: color .2s ease;
}
.wip-cta { background: var(--bleu); color: #fff; }
.wip-cta-fant { color: var(--fonte); box-shadow: inset 0 0 0 1.5px var(--fonte); }

/* le balayage suit la diagonale 4:3 du logo */
.wip-cta::before, .wip-cta-fant::before {
  content: ''; position: absolute; inset: -2px -34%; z-index: -1;
  transform: translateX(-102%) skewX(-36.87deg);
  transition: transform .42s cubic-bezier(.16,1,.3,1);
}
.wip-cta::before { background: var(--fonte); }
.wip-cta-fant::before { background: var(--fonte); }
.wip-cta:hover::before, .wip-cta-fant:hover::before { transform: translateX(0) skewX(-36.87deg); }
.wip-cta-fant:hover { color: var(--magnesie); }

.wip-cta i, .wip-cta-fant i {
  font-style: normal; font-family: var(--mono); font-size: 12px;
  transition: transform .3s cubic-bezier(.16,1,.3,1);
}
.wip-cta:hover i, .wip-cta-fant:hover i { transform: translateX(4px); }

/* le clip-path masquerait l'outline : anneau intérieur au focus */
.wip-cta:focus-visible, .wip-cta-fant:focus-visible {
  outline: none; box-shadow: inset 0 0 0 2.5px var(--magnesie), inset 0 0 0 4.5px var(--bleu);
}
.wip-cta-sm { padding: 10px 17px; font-size: 13px; --chanfrein: 11px; --talon: 8px; }

/* ———————————————————————— hero : le nom se déplie ———————————————————————— */
.wip-hero { background: var(--fonte); color: var(--magnesie); position: relative; }
.wip-hero .wip-mono { color: var(--beton-c); }

/* repères de colonnes — un plan de chantier, pas une décoration */
.wip-hero::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  max-width: 1240px; margin: 0 auto; left: 0; right: 0;
  background-image: repeating-linear-gradient(to right, rgba(236,235,229,.055) 0 1px, transparent 1px calc(100% / 12));
  background-position: 30px 0; background-size: calc(100% - 60px) 100%; background-repeat: no-repeat;
}
@media (max-width: 760px) { .wip-hero::before { display: none; } }

.wip-hero-piste { height: 240vh; }
.wip-hero-colle {
  position: sticky; top: var(--nav-h); height: calc(100vh - var(--nav-h));
  display: flex; align-items: center;
}
.wip-hero-colle > .wip-wrap { width: 100%; position: relative; }
.wip-hero-piste.statique { height: auto; }
.wip-hero-colle.statique { position: static; height: auto; padding: 74px 0 84px; }

.wip-hero-in { display: grid; grid-template-columns: 46px 1fr; gap: 32px; align-items: center; margin-top: 30px; }

/* la jauge : trois incréments, le nom même de la marque */
.wip-rail { display: flex; flex-direction: column; gap: 7px; }
.wip-rail-seg { width: 4px; height: 62px; background: #1C1F1B; position: relative; overflow: hidden; }
.wip-rail-seg i { position: absolute; inset: 0; transform-origin: top; display: block; }

.wip-titre { font-size: clamp(48px, 9.6vw, 132px); text-transform: uppercase; font-stretch: 125%; }
.wip-titre .l { display: block; }
.wip-titre .mot {
  position: relative; display: inline-block; padding-bottom: .1em;
  color: #262A23; transition: color .6s ease; /* éteint mais perceptible ; le texte complet est dans .wip-sr */
}
.wip-titre .mot.on { color: var(--magnesie); }
.wip-titre .mot em {
  position: absolute; left: 0; bottom: 0; height: .07em; width: 100%;
  transform-origin: left; display: block;
}

.wip-sous {
  margin-top: 34px; font-size: 18px; max-width: 540px; color: #B9BCB5;
  line-height: 1.6; font-weight: 400;
}
.wip-actions { margin-top: 30px; display: flex; gap: 12px; flex-wrap: wrap; }
.wip-hero .wip-cta-fant { color: var(--magnesie); box-shadow: inset 0 0 0 1.5px #454842; }
.wip-hero .wip-cta-fant::before { background: var(--magnesie); }
.wip-hero .wip-cta-fant:hover { color: var(--fonte); }

.wip-faits {
  margin-top: 34px; padding-top: 18px; border-top: 1px solid var(--trait-n);
  display: flex; gap: 0; flex-wrap: wrap; align-items: center;
}
.wip-faits .wip-mono { color: var(--magnesie); font-weight: 500; }
.wip-faits > span + span::before {
  content: ''; display: inline-block; width: 1px; height: 10px; margin: 0 16px;
  background: #3A3E38; transform: skewX(-36.87deg); vertical-align: -1px;
}

@media (max-width: 760px) {
  .wip-hero-in { grid-template-columns: 26px 1fr; gap: 16px; }
  .wip-rail-seg { height: 46px; width: 3px; }
  .wip-sous { font-size: 16.5px; margin-top: 26px; }
}

/* ————————————————— en-tête de section : index, règle, titre ————————————————— */
.wip-tsec { margin-bottom: 50px; }

.wip-tsec-regle {
  display: block; height: 6px; width: 100%;
  clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
  transform-origin: left; transform: scaleX(0);
  transition: transform .85s cubic-bezier(.16, 1, .3, 1);
}
.wip-tsec.vu .wip-tsec-regle { transform: scaleX(1); }

.wip-tsec-oeil {
  display: flex; align-items: center; gap: 14px; margin-top: 17px;
  opacity: 0; transform: translateY(6px);
  transition: opacity .5s ease .2s, transform .5s ease .2s;
}
.wip-tsec.vu .wip-tsec-oeil { opacity: 1; transform: none; }
.wip-tsec-oeil b { font-weight: 600; color: var(--fonte); }
.wip-nom .wip-tsec-oeil b { color: var(--magnesie); }

.wip-tsec h2 {
  font-family: var(--display); font-weight: 900; font-stretch: 112%;
  font-size: clamp(34px, 6vw, 74px); letter-spacing: -.035em; line-height: .96;
  margin-top: 14px; max-width: 16ch;
}
.wip-tsec h2 .m { display: inline-block; overflow: hidden; vertical-align: bottom; padding-bottom: .05em; }
.wip-tsec h2 .m > i {
  display: inline-block; font-style: normal;
  transform: translateY(110%);
  transition: transform .85s cubic-bezier(.16, 1, .3, 1);
  transition-delay: calc(.26s + var(--i) * .05s);
}
.wip-tsec.vu h2 .m > i { transform: none; }

.wip-tsec-intro {
  max-width: 600px; margin-top: 22px; font-size: 17px; line-height: 1.6; color: var(--encre);
  opacity: 0; transform: translateY(8px);
  transition: opacity .6s ease .42s, transform .6s ease .42s;
}
.wip-tsec.vu .wip-tsec-intro { opacity: 1; transform: none; }

.wip-nom .wip-tsec h2 { color: var(--magnesie); }
.wip-nom .wip-tsec-intro { color: var(--beton-c); }

@media (max-width: 700px) {
  .wip-tsec h2 { max-width: none; }
  .wip-tsec { margin-bottom: 36px; }
  .wip-tsec-intro { font-size: 16px; }
}

/* ———————————————————————————————— sections ———————————————————————————————— */
.wip-sec { padding: 96px 0; border-top: 1px solid var(--trait); }
.wip-sec.sans-trait { border-top: 0; }
.wip-sec.pose { background: var(--papier); border-top: 0; }
@media (max-width: 700px) { .wip-sec { padding: 62px 0; } }

/* ———————————————————————————————— planning ———————————————————————————————— */
.wip-legende { display: flex; gap: 22px; flex-wrap: wrap; margin-bottom: 28px; }
.wip-legende span { display: flex; align-items: center; gap: 9px; }

.wip-pastille { width: 10px; height: 10px; flex: none; border-radius: 50%; }
.wip-pastille.anneau { background: transparent; }

.wip-planning {
  display: grid; grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1px; background: var(--trait);
  box-shadow: 0 0 0 1px var(--trait);
}
.wip-jour { background: var(--magnesie); display: flex; flex-direction: column; }
.wip-jour-tete { padding: 15px 15px 13px; border-bottom: 1px solid var(--trait); }
.wip-jour-tete strong {
  font-family: var(--display); font-size: 12px; font-weight: 700; font-stretch: 90%;
  letter-spacing: .12em; text-transform: uppercase;
}
.wip-creneau {
  position: relative; padding: 13px 15px; border-bottom: 1px solid #DFDED5;
  display: flex; flex-direction: column; gap: 5px;
  transition: background .2s ease;
}
.wip-creneau::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: var(--c); transform: scaleY(0); transform-origin: bottom;
  transition: transform .28s cubic-bezier(.16,1,.3,1);
}
.wip-creneau:last-child { border-bottom: 0; }
.wip-creneau:hover { background: #E6E5DC; }
.wip-creneau:hover::before { transform: scaleY(1); transform-origin: top; }
.wip-creneau b { font-family: var(--mono); font-size: 11.5px; font-weight: 600; letter-spacing: -.01em; }
.wip-creneau span { display: flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 500; color: var(--encre); }
.wip-note { margin-top: 22px; display: flex; gap: 0; flex-wrap: wrap; align-items: center; }
.wip-note > span + span::before {
  content: ''; display: inline-block; width: 1px; height: 10px; margin: 0 16px;
  background: var(--trait); transform: skewX(-36.87deg); vertical-align: -1px;
}

@media (max-width: 900px) { .wip-planning { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 560px) {
  .wip-planning { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .wip-creneau { padding: 11px 12px; }
}

/* ———————————————————————————————— étapes ———————————————————————————————— */
.wip-etapes { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 2px solid var(--fonte); }
.wip-etape { position: relative; padding: 30px 30px 34px; border-right: 1px solid var(--trait); }
.wip-etape:last-child { border-right: 0; }
.wip-etape::before {
  content: ''; position: absolute; top: -2px; left: 0; right: 0; height: 2px;
  background: var(--bleu); transform: scaleX(0); transform-origin: left;
  transition: transform .45s cubic-bezier(.16,1,.3,1);
}
.wip-etape:hover::before { transform: scaleX(1); }
.wip-etape-n {
  font-family: var(--mono); font-size: 26px; font-weight: 600; color: var(--bleu);
  letter-spacing: -.04em; display: block; line-height: 1;
}
.wip-etape h3 {
  font-family: var(--display); font-size: 22px; font-weight: 700; font-stretch: 105%;
  letter-spacing: -.025em; margin-top: 16px; line-height: 1.15;
}
.wip-etape p { margin-top: 11px; color: var(--encre); font-size: 15.5px; }
.wip-etape .wip-mono { display: inline-block; margin-top: 18px; padding-top: 10px; border-top: 1px solid var(--trait); }
@media (max-width: 820px) {
  .wip-etapes { grid-template-columns: 1fr; }
  .wip-etape { border-right: 0; border-bottom: 1px solid var(--trait); padding: 26px 0 28px; }
  .wip-etape:last-child { border-bottom: 0; }
}

/* ———————————————————————————————— espaces ———————————————————————————————— */
.wip-espaces { border-top: 2px solid var(--fonte); }
.wip-espace { border-bottom: 1px solid var(--trait); }
.wip-espace.on { background: var(--papier); }
.wip-espace-tete {
  width: 100%; display: grid; grid-template-columns: 52px 1fr auto 34px;
  gap: 20px; align-items: center; padding: 24px 0; text-align: left;
  transition: padding .26s cubic-bezier(.16,1,.3,1), background .26s ease;
}
.wip-espace-tete:hover { padding-left: 14px; padding-right: 14px; }
.wip-espace.on .wip-espace-tete { padding-left: 14px; padding-right: 14px; }

/* le disque : anneau de couleur sur corps de fonte, comme un disque calibré */
.wip-disque {
  width: 46px; height: 46px; border-radius: 50%; flex: none;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono); font-size: 9px; font-weight: 600; letter-spacing: -.03em;
  border: 4px solid; box-shadow: 0 0 0 1px var(--trait);
  transition: transform .4s cubic-bezier(.16,1,.3,1);
}
.wip-espace-tete:hover .wip-disque { transform: rotate(-12deg); }

.wip-espace-nom {
  font-family: var(--display); font-size: clamp(21px, 3.1vw, 34px); font-weight: 800;
  font-stretch: 108%; letter-spacing: -.03em; line-height: 1.05;
}
.wip-espace-meta { font-family: var(--mono); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: var(--beton-f); }
.wip-croix {
  position: relative; width: 18px; height: 18px; justify-self: end;
  transition: transform .35s cubic-bezier(.16,1,.3,1);
}
.wip-croix::before, .wip-croix::after {
  content: ''; position: absolute; background: var(--fonte);
  left: 50%; top: 50%; transform: translate(-50%, -50%);
}
.wip-croix::before { width: 18px; height: 2px; }
.wip-croix::after { width: 2px; height: 18px; transition: opacity .3s ease; }
.wip-croix.on { transform: rotate(180deg); }
.wip-croix.on::after { opacity: 0; }

.wip-espace-corps {
  display: grid; grid-template-rows: 0fr;
  transition: grid-template-rows .48s cubic-bezier(.16, 1, .3, 1);
}
.wip-espace-corps.on { grid-template-rows: 1fr; }
.wip-espace-corps > div { overflow: hidden; min-height: 0; }
.wip-espace-in { display: grid; grid-template-columns: 52px 1fr 1fr; gap: 20px; padding: 4px 14px 34px; }
.wip-espace-in p { color: var(--encre); font-size: 16px; line-height: 1.62; max-width: 430px; }
.wip-fiche { display: flex; flex-direction: column; gap: 10px; align-self: start; }
.wip-fiche div { display: flex; justify-content: space-between; gap: 16px; border-bottom: 1px solid var(--trait); padding-bottom: 8px; }
.wip-fiche span:last-child { font-family: var(--mono); font-size: 11.5px; font-weight: 500; color: var(--fonte); }
@media (max-width: 760px) {
  .wip-espace-tete { grid-template-columns: 40px 1fr 24px; gap: 16px; }
  .wip-espace-tete .wip-espace-meta { display: none; }
  .wip-disque { width: 38px; height: 38px; border-width: 3px; font-size: 8px; }
  .wip-espace-in { grid-template-columns: 1fr; gap: 24px; padding: 4px 0 28px; }
}

/* ———————————————————— section sombre : pourquoi ce nom ———————————————————— */
.wip-nom { background: var(--fonte); color: var(--magnesie); padding: 96px 0; position: relative; overflow: hidden; }
.wip-nom .wip-mono { color: var(--beton-c); }
.wip-nom > .wip-wrap { position: relative; z-index: 1; }

/* le symbole officiel en filigrane — tracé v02 intact, jamais contouré :
   seule l'opacité de pose varie, comme pour un filigrane imprimé */
.wip-nom-filigrane {
  position: absolute; right: 34px; bottom: 44px; z-index: 0;
  width: min(44vw, 500px); height: auto;
  color: var(--magnesie); opacity: .05; pointer-events: none;
}
@media (max-width: 900px) { .wip-nom-filigrane { display: none; } }

.wip-nom-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 50px; background: var(--trait-n); }
.wip-nom-col { position: relative; background: var(--fonte); border-top: 4px solid; padding: 22px 26px 30px 0; }
.wip-nom-col:not(:first-child) { padding-left: 26px; }
.wip-nom-col h3 {
  font-family: var(--display); font-weight: 900; font-stretch: 118%;
  letter-spacing: -.035em; font-size: clamp(26px, 3.4vw, 40px); line-height: 1;
  text-transform: uppercase;
}
.wip-nom-col p { margin-top: 14px; color: var(--beton-c); font-size: 15.5px; line-height: 1.6; max-width: 34ch; }
@media (max-width: 800px) {
  .wip-nom-grid { grid-template-columns: 1fr; gap: 0; background: none; }
  .wip-nom-col { padding: 22px 0 28px !important; border-bottom: 1px solid var(--trait-n); }
}

.wip-sign {
  margin-top: 50px; padding-top: 20px; border-top: 1px solid var(--trait-n);
  display: flex; gap: 0; flex-wrap: wrap; align-items: center;
}
.wip-sign > span + span::before {
  content: ''; display: inline-block; width: 1px; height: 10px; margin: 0 16px;
  background: #3A3E38; transform: skewX(-36.87deg); vertical-align: -1px;
}

/* ———————————————— emplacement photo : coupe 4:3, même côté ———————————————— */
.wip-photo {
  position: relative; background: var(--papier);
  box-shadow: inset 0 0 0 1px var(--trait);
  display: flex; align-items: flex-end; padding: 16px; min-height: 220px;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--coupe-y)), calc(100% - var(--coupe-x)) 100%, 0 100%);
}
.wip-photo::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(126.87deg, transparent 0 11px, rgba(94,98,92,.09) 11px 12px);
}
.wip-photo span {
  position: relative; font-family: var(--mono); font-size: 9px; font-weight: 400;
  letter-spacing: .07em; text-transform: uppercase; color: var(--beton-f); line-height: 1.7;
  max-width: 22ch;
}

/* ———————————————————————————————— équipe ———————————————————————————————— */
.wip-equipe { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.wip-equipe > div:nth-child(2) { transform: translateY(38px); }
.wip-equipe h3 {
  font-family: var(--display); font-size: 24px; font-weight: 800; font-stretch: 108%;
  letter-spacing: -.03em; margin-top: 18px;
}
@media (max-width: 800px) { .wip-equipe { grid-template-columns: 1fr; gap: 40px; } .wip-equipe > div:nth-child(2) { transform: none; } }

/* ———————————————————————————— formules & appel ———————————————————————————— */
.wip-formules { border-top: 2px solid var(--fonte); margin-bottom: 48px; }
.wip-formule {
  display: grid; grid-template-columns: 1fr 1.7fr; gap: 30px;
  padding: 24px 0; border-bottom: 1px solid var(--trait);
  transition: padding .26s cubic-bezier(.16,1,.3,1);
}
.wip-formule:hover { padding-left: 14px; }
.wip-formule h3 {
  font-family: var(--display); font-size: 23px; font-weight: 800; font-stretch: 105%;
  letter-spacing: -.03em; line-height: 1.1;
}
.wip-formule p { color: var(--encre); font-size: 15.5px; }
@media (max-width: 740px) { .wip-formule { grid-template-columns: 1fr; gap: 8px; } }

.wip-appel {
  background: var(--fonte); color: var(--magnesie); padding: 48px;
  display: grid; grid-template-columns: 1.2fr auto; gap: 36px; align-items: center;
}
.wip-appel .wip-mono { color: var(--beton-c); }
.wip-appel h3 {
  font-family: var(--display); font-weight: 900; font-stretch: 112%; letter-spacing: -.035em;
  font-size: clamp(25px, 3.3vw, 38px); line-height: 1.04; margin-top: 14px; max-width: 500px;
}
.wip-appel p { margin-top: 16px; color: var(--beton-c); font-size: 16px; max-width: 480px; }
.wip-tel {
  font-family: var(--display); font-weight: 900; font-stretch: 118%;
  font-size: clamp(27px, 3.6vw, 40px); letter-spacing: -.04em; white-space: nowrap;
  display: block; font-feature-settings: 'tnum' 1; transition: color .2s ease;
}
.wip-tel:hover { color: var(--bleu-c); }
@media (max-width: 820px) { .wip-appel { grid-template-columns: 1fr; padding: 30px; gap: 26px; } }

/* ———————————————————————————————— questions ———————————————————————————————— */
.wip-q { border-top: 2px solid var(--fonte); }
.wip-q-item {
  border-bottom: 1px solid var(--trait); padding: 26px 0;
  display: grid; grid-template-columns: 1fr 1.25fr; gap: 36px;
}
.wip-q-item h3 {
  font-family: var(--display); font-size: 20px; font-weight: 700; font-stretch: 100%;
  letter-spacing: -.02em; line-height: 1.3; color: var(--fonte);
}
.wip-q-item p { color: var(--encre); font-size: 16px; line-height: 1.62; }
@media (max-width: 760px) { .wip-q-item { grid-template-columns: 1fr; gap: 10px; } }

/* ———————————————————————————————— lieu ———————————————————————————————— */
.wip-lieu { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
@media (max-width: 860px) { .wip-lieu { grid-template-columns: 1fr; gap: 34px; } }

.wip-carte { background: var(--magnesie); box-shadow: inset 0 0 0 1px var(--trait); }
.wip-carte-vue { position: relative; aspect-ratio: 4 / 3; min-height: 300px; }
.wip-carte-vue iframe {
  position: absolute; inset: 0; width: 100%; height: 100%; border: 0; display: block;
  filter: grayscale(1) contrast(1.08) brightness(1.04);
  transition: filter .55s ease;
}
.wip-carte:hover .wip-carte-vue iframe, .wip-carte:focus-within .wip-carte-vue iframe { filter: none; }
/* padding droit majoré : le chanfrein du bloc mangerait la fin du lien */
.wip-carte-pied {
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  padding: 14px 44px 14px 16px; border-top: 1px solid var(--trait); flex-wrap: wrap;
}
.wip-carte-pied a {
  font-size: 14px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;
  border-bottom: 1.5px solid var(--fonte); padding-bottom: 2px; transition: color .2s, border-color .2s;
}
.wip-carte-pied a:hover { color: var(--bleu); border-bottom-color: var(--bleu); }

.wip-fiche-lieu { margin-top: 30px; display: flex; flex-direction: column; gap: 11px; max-width: 420px; }
.wip-fiche-lieu > div { display: flex; justify-content: space-between; gap: 16px; border-bottom: 1px solid var(--trait); padding-bottom: 9px; }
.wip-fiche-lieu span:last-child { color: var(--fonte); font-weight: 500; }

/* ———————————————————————————————— final ———————————————————————————————— */
.wip-final { background: var(--papier); border-top: 1px solid var(--trait); padding: 104px 0; text-align: center; position: relative; }
.wip-final h2 {
  font-family: var(--display); font-weight: 900; font-stretch: 118%;
  font-size: clamp(34px, 6.2vw, 70px); letter-spacing: -.04em; line-height: .98;
  text-wrap: balance;
}
.wip-final p { margin: 22px auto 32px; max-width: 470px; color: var(--encre); font-size: 17px; }

/* ———————————————————————————————— pied ———————————————————————————————— */
.wip-pied { background: var(--fonte); color: var(--beton-c); padding: 62px 0 34px; overflow: hidden; }
.wip-pied-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; margin-bottom: 52px; }
/* #5E625C ne tient pas sur le noir de fonte (3,1:1) : béton clair, 5,9:1 */
.wip-pied-grid h4 {
  font-family: var(--mono); font-size: 10px; font-weight: 500; letter-spacing: .12em;
  text-transform: uppercase; color: var(--beton-c); margin-bottom: 14px;
  padding-bottom: 12px; border-bottom: 1px solid var(--trait-n);
}
.wip-pied-grid li { font-size: 14.5px; color: #C4C7C0; margin-bottom: 6px; }
.wip-pied-grid a { transition: color .18s ease; }
.wip-pied-grid a:hover { color: var(--magnesie); }
@media (max-width: 760px) { .wip-pied-grid { grid-template-columns: repeat(2, 1fr); gap: 26px; } }

/* Le lockup complet (wip + ATHLETICS) : la fin de page est l'endroit où
   la marque se signe en entier. 340 px de large = bien au-dessus du seuil
   de lisibilité de 160 px du master v02. */
.wip-pied-logo { color: var(--magnesie); }
.wip-pied-logo svg { display: block; width: clamp(220px, 34vw, 340px); height: auto; }

/* zone de protection = 45,5 % de la hauteur de lettre, soit 39 px au plus
   grand cadran : le filet de la devise ne doit pas entrer dedans */
.wip-pied-devise {
  font-family: var(--mono); font-size: 10px; font-weight: 500; letter-spacing: .28em;
  text-transform: uppercase; color: var(--magnesie); margin-top: 46px;
  padding-top: 20px; border-top: 1px solid var(--trait-n);
}
.wip-pied-legal { margin-top: 16px; font-size: 12.5px; line-height: 1.85; color: var(--beton-c); max-width: 70ch; }

/* texte lu par les moteurs et les lecteurs d'écran, invisible à l'œil */
.wip-sr { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }

/* ———————————————————————————————— reveal ———————————————————————————————— */
.wip-rev { opacity: 0; transform: translateY(18px); transition: opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1); }
.wip-rev.vu { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .wip *, .wip *::before, .wip *::after { animation: none !important; transition: none !important; }
  .wip-rev { opacity: 1; transform: none; }
  .wip-tsec-regle { transform: scaleX(1) !important; }
  .wip-tsec h2 .m > i, .wip-tsec-oeil, .wip-tsec-intro { transform: none !important; opacity: 1 !important; }
}
`;

/* ————————————————————————————————————————————————————————————————
   BANQUE DE SIGNES — master vectoriel v02, tracés officiels.
   Repris tels quels depuis brand/logos/v02/ : aucun nœud modifié,
   aucune déformation. Chaque instance pose `fill: currentColor`, ce
   qui permet de sortir le logo en magnésie ou en noir de fonte sans
   jamais toucher au fichier source.
   Les fichiers d'origine sont dans logo/ pour tous les autres usages.
———————————————————————————————————————————————————————————————— */
const TRACE_W =
  "M 0,0 L 455,0 L 455,632 A 48,48 0 0 0 503,680 L 707,680 A 48,48 0 0 0 755,632 L 755,0 L 1210,0 L 1210,632 A 48,48 0 0 0 1258,680 L 1462,680 A 48,48 0 0 0 1510,632 L 1510,0 L 1965,0 L 1965,661.36 A 45,45 0 0 1 1951.82,693.18 L 1658.18,986.82 A 45,45 0 0 1 1626.36,1000 L 1027.5,1000 A 45,45 0 0 1 982.5,955 L 982.5,750 L 661.17,991 A 45,45 0 0 1 634.17,1000 L 224,1000 A 224,224 0 0 1 0,776 Z";

const TRACE_WORDMARK =
  TRACE_W +
  " M 2029,0 L 2484,0 L 2484,1000 L 2029,1000 Z M 2548,0 L 3003,0 L 3003,120.86 A 10,10 0 0 0 3020.07,127.93 L 3144.49,3.51 A 12,12 0 0 1 3152.97,0 L 3564,0 A 436,436 0 0 1 4000,436 A 436,436 0 0 1 3564,872 L 3078.97,872 A 12,12 0 0 1 3070.49,868.49 L 3020.07,818.07 A 10,10 0 0 0 3003,825.14 L 3003,1090 L 2548,1090 Z M 3003,298 L 3003,574 L 3563.4,574 A 96.6,96.6 0 0 0 3660,477.4 L 3660,394.6 A 96.6,96.6 0 0 0 3563.4,298 Z";

const TRACE_ATHLETICS =
  "M2649 1285 2704.31 1145H2729.82L2785.33 1285H2764.31L2750.63 1250.31H2682.47L2669 1285ZM2688.8 1233.78H2744.1L2727.16 1189.9Q2726.35 1187.45 2724.51 1182.55Q2722.67 1177.65 2720.73 1172.04Q2718.8 1166.43 2717.16 1161.73H2715.94Q2714.51 1165.82 2712.67 1171.12Q2710.84 1176.43 2709 1181.43Q2707.16 1186.43 2705.94 1189.9Z M2867.19 1285V1161.94H2819.23V1145H2934.94V1161.94H2886.57V1285Z M2985.17 1285V1145H3004.56V1205H3080.68V1145H3100.27V1285H3080.68V1221.94H3004.56V1285Z M3163.97 1285V1145H3183.35V1268.06H3252.95V1285Z M3301.95 1285V1145H3409.7V1161.73H3321.34V1205H3400.72V1221.73H3321.34V1268.27H3410.93V1285Z M3502.99 1285V1161.94H3455.03V1145H3570.75V1161.94H3522.38V1285Z M3620.97 1285V1145H3640.36V1285Z M3763.85 1287.45Q3731.61 1287.45 3714.26 1269.69Q3696.92 1251.94 3696.92 1215Q3696.92 1178.67 3714.57 1160.61Q3732.22 1142.55 3764.06 1142.55Q3782.02 1142.55 3795.9 1148.37Q3809.77 1154.18 3817.63 1165.92Q3825.49 1177.65 3825.49 1195.41H3805.9Q3805.9 1177.24 3794.47 1168.27Q3783.04 1159.29 3764.06 1159.29Q3741.81 1159.29 3729.47 1172.24Q3717.12 1185.2 3717.12 1213.37V1217.65Q3717.12 1245.61 3729.36 1258.16Q3741.61 1270.71 3764.06 1270.71Q3783.45 1270.71 3794.98 1261.84Q3806.51 1252.96 3806.51 1234.59H3825.49Q3825.49 1252.76 3817.53 1264.39Q3809.57 1276.02 3795.59 1281.73Q3781.61 1287.45 3763.85 1287.45Z M3932.65 1287.45Q3917.35 1287.45 3904.08 1283.37Q3890.82 1279.29 3882.55 1270Q3874.29 1260.71 3874.29 1245.41Q3874.29 1244.39 3874.39 1243.37Q3874.49 1242.35 3874.49 1241.33H3894.08Q3894.08 1242.14 3893.98 1243.37Q3893.88 1244.59 3893.88 1245.61Q3893.88 1258.06 3904.69 1264.39Q3915.51 1270.71 3932.04 1270.71Q3938.37 1270.71 3945 1269.8Q3951.63 1268.88 3957.35 1266.33Q3963.06 1263.78 3966.73 1259.39Q3970.41 1255 3970.41 1248.27Q3970.41 1240.51 3965.41 1235.51Q3960.41 1230.51 3952.14 1227.35Q3943.88 1224.18 3933.98 1221.73Q3924.08 1219.29 3914.18 1216.43Q3904.29 1213.57 3896.02 1209.18Q3887.76 1204.8 3882.76 1197.76Q3877.76 1190.71 3877.76 1179.9Q3877.76 1162.35 3892.04 1152.45Q3906.33 1142.55 3933.27 1142.55Q3947.96 1142.55 3959.9 1146.63Q3971.84 1150.71 3978.88 1159.49Q3985.92 1168.27 3985.92 1181.94V1184.39H3966.73V1181.33Q3966.73 1171.12 3957.45 1165.2Q3948.16 1159.29 3933.88 1159.29Q3915.31 1159.29 3906.33 1164.59Q3897.35 1169.9 3897.35 1178.27Q3897.35 1185.61 3902.45 1190.1Q3907.55 1194.59 3915.82 1197.55Q3924.08 1200.51 3933.88 1202.96Q3943.67 1205.41 3953.57 1208.37Q3963.47 1211.33 3971.73 1215.82Q3980 1220.31 3985 1227.45Q3990 1234.59 3990 1245.41Q3990 1260.31 3982.65 1269.59Q3975.31 1278.88 3962.35 1283.16Q3949.39 1287.45 3932.65 1287.45Z";

/** Le wordmark seul (wip). Bandeau étroit, ≥ 90 px de large. */
function Wordmark({ className }) {
  return (
    <svg className={className} viewBox="0 0 4000 1090" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={TRACE_WORDMARK} />
    </svg>
  );
}

/** Le symbole seul (le w). Filigrane, favicon, patch. */
function Symbole({ className }) {
  return (
    <svg className={className} viewBox="0 0 1965 1000" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={TRACE_W} />
    </svg>
  );
}

/** Le lockup complet (wip + ATHLETICS). ≥ 160 px de large. */
function Lockup({ className }) {
  return (
    <svg className={className} viewBox="0 0 4000 1288" fill="currentColor" role="img" aria-label="WIP Athletics">
      <path d={TRACE_WORDMARK} />
      <path d={TRACE_ATHLETICS} />
    </svg>
  );
}

/**
 * Les quatre espaces.
 * `disque` = couleur de l'anneau, reprise du code des disques calibrés.
 * `inverse` = corps clair et anneau sombre, pour le disque noir de 2,5 kg
 * qui disparaîtrait sur un corps de fonte.
 */
const ESPACES = [
  {
    id: "cf",
    n: "25",
    disque: "var(--d25)",
    nom: "Cross-training & Hyrox",
    meta: "420 m² · 12 par cours",
    texte:
      "Le cœur de la salle : entraînement fonctionnel en petit groupe. Barres, anneaux, rameurs, sled, ski erg. Chaque mouvement du jour a une version débutante écrite au tableau, à côté de la version prescrite — pas en note de bas de page. Le coach vous donne la vôtre avant que la séance commence.",
    fiche: [
      ["Surface", "420 m²"],
      ["Groupe", "12 max"],
      ["Durée", "60 min"],
      ["Créneaux", "6h30 → 21h"],
    ],
  },
  {
    id: "pole",
    n: "15",
    disque: "var(--d15)",
    nom: "Pole Dance & Aérien",
    meta: "110 m² · 6 par cours",
    texte:
      "Un studio dédié, pas un coin de salle. Six barres, 4,20 m sous plafond, sol amortissant et rideaux occultants — parce que la première séance, on n'a pas envie d'être vue depuis le parking.",
    fiche: [
      ["Surface", "110 m²"],
      ["Barres", "6"],
      ["Hauteur", "4,20 m"],
      ["Durée", "75 min"],
    ],
  },
  {
    id: "open",
    n: "2.5",
    disque: "var(--d2)",
    inverse: true,
    nom: "Open Gym",
    meta: "200 m² · accès libre",
    texte:
      "Rack, haltères, machines, plateforme d'haltérophilie. Vous venez quand vous voulez, vous faites ce que vous voulez. Un coach est toujours dans la salle si vous avez une question — il ne viendra pas vous corriger sans qu'on lui demande.",
    fiche: [
      ["Surface", "200 m²"],
      ["Accès", "7h → 22h"],
      ["Racks", "6"],
      ["Plateforme", "1"],
    ],
  },
  {
    id: "chill",
    n: "5",
    disque: "var(--d5)",
    nom: "Zone Chill",
    meta: "60 m² · café",
    texte:
      "Canapés, café, grande table. C'est ici que les gens restent vingt minutes après la séance et que la salle devient autre chose qu'une salle. On l'a dessiné en premier, avant les racks.",
    fiche: [
      ["Surface", "60 m²"],
      ["Places assises", "24"],
      ["Café", "torréfié à Tours"],
      ["Wifi", "oui"],
    ],
  },
];

/**
 * Les trois verbes du nom.
 * `debut` = entrée dans la course de scroll (0 → 1). Work part en négatif :
 * il est déjà allumé et souligné à l'arrivée sur la page, les deux autres
 * se révèlent pendant le premier écran de défilement.
 *
 * Couleurs : disques calibrés 25 kg (rouge) et 15 kg (jaune), puis le 20 kg —
 * bleu, qui se trouve être aussi l'accent unique de la marque. Le verbe qui
 * porte le plus loin est celui qui porte la couleur d'action.
 */
const MOTS = [
  {
    mot: "Work.",
    couleur: "var(--d25)",
    glose: "Quel que soit le point de départ, quel que soit le dernier sport pratiqué — même si c'était il y a quinze ans.",
    debut: -0.25,
  },
  {
    mot: "Improve.",
    couleur: "var(--d15)",
    glose: "Par rapport à soi, jamais par rapport au voisin. C'est la seule comparaison qui a du sens, et la seule qu'on encourage ici.",
    debut: 0.16,
  },
  {
    mot: "Progress.",
    couleur: "var(--bleu-c)",
    glose: "Et ça ne s'arrête pas : ni pour celui qui pousse la porte en octobre, ni pour celui qui vise les qualifications.",
    debut: 0.48,
  },
];

/**
 * Disciplines du planning. Le code renvoie à la couleur de disque de l'espace.
 * Hyrox partage l'espace — donc la couleur — du cross-training : il s'en
 * distingue par un anneau plutôt qu'une pastille pleine, jamais par une
 * couleur de plus (la marque HYROX ne se concurrence pas).
 */
const DISCIPLINES = {
  ct: { nom: "Cross-training", c: "var(--d25)" },
  hx: { nom: "Hyrox", c: "var(--d25)", anneau: true },
  pd: { nom: "Pole Dance", c: "var(--d15)" },
  og: { nom: "Open Gym", c: "var(--d2)" },
};

const PLANNING = [
  {
    jour: "Lundi",
    creneaux: [["06:30", "ct"], ["12:15", "ct"], ["17:30", "ct"], ["18:30", "ct"], ["19:45", "pd"]],
  },
  {
    jour: "Mardi",
    creneaux: [["07:00", "ct"], ["12:15", "hx"], ["18:30", "ct"], ["19:45", "ct"], ["20:45", "og"]],
  },
  {
    jour: "Mercredi",
    creneaux: [["06:30", "ct"], ["12:15", "ct"], ["17:30", "pd"], ["18:30", "ct"], ["19:45", "hx"]],
  },
  {
    jour: "Jeudi",
    creneaux: [["06:30", "ct"], ["12:15", "ct"], ["18:30", "pd"], ["19:45", "ct"], ["20:45", "og"]],
  },
  {
    jour: "Vendredi",
    creneaux: [["07:00", "ct"], ["12:15", "ct"], ["17:30", "hx"], ["18:30", "ct"], ["19:45", "pd"]],
  },
  {
    jour: "Samedi",
    creneaux: [["09:00", "ct"], ["10:15", "ct"], ["11:30", "hx"], ["14:00", "pd"], ["15:30", "og"]],
  },
];

const QUESTIONS = [
  {
    q: "« Je n'ai jamais mis les pieds dans une salle. »",
    r: "C'est le profil le plus fréquent chez nous, et de loin. La séance découverte est faite exactement pour ça : on ne vous met pas dans un cours, on vous fait visiter et on bouge à deux.",
  },
  {
    q: "« Il faut être en forme avant de commencer ? »",
    r: "Non. C'est comme attendre de savoir nager pour prendre un cours de natation. On adapte les charges et les mouvements dès la première minute — c'est le métier du coach, pas une faveur.",
  },
  {
    q: "« J'ai 55 ans, ce n'est plus pour moi. »",
    r: "Nos adhérents vont de 16 à 71 ans. Les mouvements sont les mêmes que ceux de la vie courante : se relever, porter, pousser. Ils deviennent plus utiles avec l'âge, pas moins.",
  },
  {
    q: "« Je ne veux pas qu'on me regarde. »",
    r: "Personne ne regarde. Tout le monde est occupé à finir sa propre série. Et si vous préférez commencer seul, l'Open Gym et le coaching individuel existent pour ça.",
  },
];

const FORMULES = [
  {
    nom: "Séance d'essai",
    desc: "Visite du lieu, discussion, et une vraie séance adaptée à votre niveau. Offerte, sans engagement.",
  },
  {
    nom: "Accès à un espace",
    desc: "Vous ne pratiquez qu'une discipline : cross-training et Hyrox, ou pole dance. Accès illimité sur tous les créneaux de cet espace.",
  },
  {
    nom: "Accès complet",
    desc: "Les quatre espaces sans restriction, y compris l'open gym en accès libre du matin au soir.",
  },
  {
    nom: "Carnet de séances",
    desc: "Pour les horaires irréguliers et ceux qui ne veulent rien signer. Séances à l'unité, valables plusieurs mois.",
  },
];

const EQUIPE = [
  {
    prenom: "Sébastien",
    role: "Coach cross-training & Hyrox — cofondateur",
    parcours:
      "Huit ans de pratique de l'entraînement fonctionnel en box affiliée, dont quatre à coacher des cours collectifs. Titulaire du CQP Instructeur Fitness. Spécialisé dans l'accueil des débutants et l'adaptation des mouvements.",
    shot: "Portrait — plein pied dans le rig, lumière naturelle, 12-100 à 35 mm",
  },
  {
    prenom: "Simon",
    role: "Coach cross-training & haltérophilie — cofondateur",
    parcours:
      "Dix ans d'entraînement fonctionnel, cinq ans de coaching en box, compétiteur régional. Suit la progression technique en haltérophilie et la préparation aux courses Hyrox.",
    shot: "Portrait — plateforme d'haltérophilie, contre-jour, 12-100 à 50 mm",
  },
  {
    prenom: "Prénom",
    role: "Coach pole dance & disciplines aériennes",
    parcours:
      "À compléter — certifications, années de pratique, spécialités. Mentionnez les formations reconnues, c'est ce que les futurs adhérents vérifient en premier.",
    shot: "Portrait — studio pole ou tapis, lumière rasante du matin",
  },
];

/* ————————————————————————————————————————————————
   RÉFÉRENCEMENT
   Mots-clés visés : salle de sport Amboise, cross-training Amboise,
   fitness fonctionnel Indre-et-Loire, Hyrox Amboise, pole dance Amboise,
   salle de sport 37400.
   ⚠️ Le mot « CrossFit » n'apparaît nulle part, y compris dans les balises :
   la salle n'est pas affiliée (§5 bis-A du brand book).
———————————————————————————————————————————————— */

const TITRE_PAGE =
  "WIP Athletics — Salle de cross-training, Hyrox et pole dance à Amboise (37)";

const DESCRIPTION_PAGE =
  "Salle de sport et de fitness fonctionnel de 1 000 m² à Amboise, en Indre-et-Loire. " +
  "Cross-training, préparation Hyrox, pole dance et open gym en accès libre. " +
  "Cours en petits groupes adaptés à tous les niveaux, séance d'essai offerte. Ouverture le 31 octobre 2026.";

const DONNEES_STRUCTUREES = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["HealthAndBeautyBusiness", "SportsActivityLocation"],
      "@id": "https://wipathletics.fr/#salle",
      name: "WIP Athletics",
      description: DESCRIPTION_PAGE,
      slogan: "Work. Improve. Progress.",
      url: "https://wipathletics.fr",
      telephone: "+33780335321",
      email: "bonjour@wipathletics.fr",
      currenciesAccepted: "EUR",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1329 chemin du Roi",
        addressLocality: "Amboise",
        postalCode: "37400",
        addressRegion: "Centre-Val de Loire",
        addressCountry: "FR",
      },
      hasMap:
        "https://www.google.com/maps/search/?api=1&query=1329+chemin+du+Roi,+37400+Amboise,+France",
      areaServed: [
        "Amboise", "Nazelles-Négron", "Pocé-sur-Cisse", "Montlouis-sur-Loire",
        "Bléré", "Château-Renault", "Tours Est", "Indre-et-Loire",
      ],
      sameAs: ["https://www.instagram.com/wip.athletic"],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "06:30",
          closes: "22:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "08:00",
          closes: "18:00",
        },
      ],
      amenityFeature: [
        "Vestiaires neufs", "Douches individuelles", "Accès PMR", "Parking gratuit",
      ].map((n) => ({ "@type": "LocationFeatureSpecification", name: n, value: true })),
      makesOffer: [
        "Cours de cross-training en petit groupe",
        "Préparation aux courses Hyrox",
        "Cours de pole dance et disciplines aériennes",
        "Open gym en accès libre",
        "Coaching individuel",
      ].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
    },
    {
      "@type": "FAQPage",
      "@id": "https://wipathletics.fr/#questions",
      mainEntity: [
        [
          "Faut-il déjà être sportif pour commencer le cross-training ?",
          "Non. Les charges et les mouvements sont adaptés dès la première séance : c'est le métier du coach. La séance d'essai se fait en individuel, hors du groupe.",
        ],
        [
          "Y a-t-il un âge limite pour s'inscrire ?",
          "Non. Nos adhérents vont de 16 à 71 ans. Les mouvements travaillés sont ceux de la vie courante : se relever, porter, pousser.",
        ],
        [
          "Où se trouve la salle et comment s'y garer ?",
          "À Amboise, en Indre-et-Loire, au 1329 chemin du Roi (37400), à dix minutes du centre-ville, dans un ancien bâtiment industriel de 1 000 m² avec un parking gratuit de 40 places devant la porte.",
        ],
        [
          "Comment réserver une séance d'essai ?",
          "Par téléphone, du lundi au samedi de 9h à 20h, ou via le formulaire de rappel. La séance d'essai est offerte et sans engagement.",
        ],
      ].map(([q, r]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: r },
      })),
    },
  ],
};

function useSeo() {
  useEffect(() => {
    document.title = TITRE_PAGE;
    const pose = (attr, cle, contenu) => {
      let el = document.head.querySelector(`meta[${attr}="${cle}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, cle);
        document.head.appendChild(el);
      }
      el.setAttribute("content", contenu);
    };
    pose("name", "description", DESCRIPTION_PAGE);
    pose("name", "robots", "index, follow");
    pose("name", "theme-color", "#0B0D0C");
    pose("property", "og:title", TITRE_PAGE);
    pose("property", "og:description", DESCRIPTION_PAGE);
    pose("property", "og:type", "website");
    pose("property", "og:locale", "fr_FR");
    pose("property", "og:image", "logo/png/wip-avatar-1000.png");
    pose("name", "twitter:card", "summary_large_image");

    // Icônes : master v02. Le favicon SVG porte son propre fond noir de fonte,
    // il reste donc lisible sur un onglet clair comme sombre.
    const poseLien = (rel, href, extra = {}) => {
      const cle = `link[rel="${rel}"]${extra.sizes ? `[sizes="${extra.sizes}"]` : ""}`;
      let el = document.head.querySelector(cle);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
      Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
    };
    poseLien("icon", "logo/wip-favicon-noir.svg", { type: "image/svg+xml" });
    poseLien("icon", "logo/png/wip-favicon-32.png", { sizes: "32x32", type: "image/png" });
    poseLien("apple-touch-icon", "logo/png/wip-apple-touch-icon-180.png");
  }, []);
}

/**
 * En-tête de section. Quatre temps à l'entrée dans l'écran :
 * la règle se trace dans la couleur de la section (chanfreinée à sa pointe),
 * l'index et l'œil apparaissent, puis le titre remonte mot à mot derrière
 * un masque, et l'intro suit.
 */
function TitreSection({ accent, index, oeil, titre, intro }) {
  return (
    <div className="wip-tsec">
      <span className="wip-tsec-regle" style={{ background: accent }} aria-hidden="true" />
      {oeil && (
        <span className="wip-tsec-oeil wip-mono">
          {index && <span aria-hidden="true">{index}</span>}
          <b>{oeil}</b>
        </span>
      )}
      <h2>
        {titre.split(" ").map((mot, i) => (
          <React.Fragment key={mot + i}>
            <span className="m">
              <i style={{ "--i": i }}>{mot}</i>
            </span>{" "}
          </React.Fragment>
        ))}
      </h2>
      {intro && <p className="wip-tsec-intro">{intro}</p>}
    </div>
  );
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".wip-rev, .wip-tsec");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vu");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

/**
 * Progression du scroll dans la piste du hero : 0 à l'arrivée sur la page,
 * 1 quand la piste est parcourue.
 *
 * Le repli statique (tout allumé, pas d'épinglage) ne se déclenche QUE si
 * l'animation ne peut pas se jouer correctement : animations réduites côté
 * système, ou fenêtre trop basse pour afficher le hero épinglé sans le
 * tronquer. Surtout pas sur un critère de largeur : une fenêtre étroite
 * n'empêche en rien l'animation, et ça la désactivait à tort en aperçu.
 */
function useCourse() {
  const piste = useRef(null);
  const [p, setP] = useState(0);
  const [statique, setStatique] = useState(false);

  useEffect(() => {
    let raf = 0;
    const maj = () => {
      raf = 0;
      const fige =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.innerHeight < 560;
      setStatique(fige);
      if (fige) {
        setP(1);
        return;
      }
      const el = piste.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const course = r.height - window.innerHeight;
      const v = course > 0 ? -r.top / course : 0;
      setP(v < 0 ? 0 : v > 1 ? 1 : v);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(maj);
    };
    maj();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { piste, p, statique };
}

/** Pastille de discipline : pleine, ou en anneau pour Hyrox. */
function Pastille({ d }) {
  return (
    <span
      className={d.anneau ? "wip-pastille anneau" : "wip-pastille"}
      style={d.anneau ? { boxShadow: `inset 0 0 0 2.5px ${d.c}` } : { background: d.c }}
    />
  );
}

export default function WipAthletics() {
  const [ouvert, setOuvert] = useState("cf");
  const racine = useReveal();
  const { piste, p, statique } = useCourse();
  useSeo();

  // avancement local d'un mot : 0 → 1 sur une fenêtre de 22 % de la course
  const avance = (debut) => {
    const v = (p - debut) / 0.22;
    return v < 0 ? 0 : v > 1 ? 1 : v;
  };

  return (
    <div className="wip" ref={racine}>
      <style>{CSS}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DONNEES_STRUCTUREES) }}
      />
      <div className="wip-grain" aria-hidden="true" />

      {/* ————— annonce ————— */}
      <div className="wip-annonce">
        <span>Ouverture <b>samedi 31 octobre 2026</b></span>
        <span>Amboise · Indre-et-Loire</span>
        <span><b>Séance découverte offerte</b></span>
      </div>

      {/* ————— nav ————— */}
      <nav className="wip-nav">
        <div className="wip-wrap wip-nav-in">
          {/* Bandeau étroit → wordmark seul (LISEZ-MOI v02). 128 px de large :
              au-dessus du seuil de 90 px, sous les 160 px qu'exigerait le lockup. */}
          <a href="#top" className="wip-logo" aria-label="WIP Athletics — retour en haut">
            <Wordmark className="wip-logo-sig" />
          </a>
          <div className="wip-liens">
            <a href="#premiere-fois">Première fois</a>
            <a href="#planning">Planning</a>
            <a href="#espaces">Les espaces</a>
            <a href="#equipe">L'équipe</a>
            <a href="#lieu">Nous trouver</a>
          </div>
          <a href="#reserver" className="wip-cta wip-cta-sm">
            Réserver ma séance<i aria-hidden="true">→</i>
          </a>
        </div>
      </nav>

      {/* ————— hero sombre : le nom se déplie au scroll ————— */}
      <header className="wip-hero" id="top">
        <div className={statique ? "wip-hero-piste statique" : "wip-hero-piste"} ref={piste}>
          <div className={statique ? "wip-hero-colle statique" : "wip-hero-colle"}>
            <div className="wip-wrap">
              <p className="wip-mono">
                Salle de cross-training &amp; fitness fonctionnel · Amboise (37) · Ouverture 31 octobre 2026
              </p>

              <div className="wip-hero-in">
                <div className="wip-rail" aria-hidden="true">
                  {MOTS.map((m) => (
                    <div className="wip-rail-seg" key={m.mot}>
                      <i style={{ background: m.couleur, transform: `scaleY(${avance(m.debut)})` }} />
                    </div>
                  ))}
                </div>

                <h1 className="wip-titre wip-h">
                  <span className="wip-sr">
                    WIP Athletics — salle de cross-training, Hyrox et pole dance
                    à Amboise en Indre-et-Loire.{" "}
                  </span>
                  {MOTS.map((m) => {
                    const a = avance(m.debut);
                    return (
                      <span className="l" key={m.mot}>
                        <span className={a > 0.12 ? "mot on" : "mot"}>
                          {m.mot}
                          <em style={{ background: m.couleur, transform: `scaleX(${a})` }} />
                        </span>
                      </span>
                    );
                  })}
                </h1>
              </div>

              <p className="wip-sous">
                On travaille, on s'améliore, on progresse — chacun par rapport à soi,
                jamais par rapport au voisin. Quatre espaces sur 1 000 m² à Amboise, et des coachs
                qui adaptent la séance à ce que vous savez faire aujourd'hui.
              </p>

              <div className="wip-actions">
                <a href="#reserver" className="wip-cta">
                  Réserver ma séance découverte<i aria-hidden="true">→</i>
                </a>
                <a href="#espaces" className="wip-cta-fant">
                  Voir les quatre espaces<i aria-hidden="true">↓</i>
                </a>
              </div>

              <div className="wip-faits">
                <span className="wip-mono">1 000 m²</span>
                <span className="wip-mono">4 espaces</span>
                <span className="wip-mono">12 par cours max</span>
                <span className="wip-mono">Sans engagement</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ————— planning ————— */}
      <section className="wip-sec sans-trait pose" id="planning">
        <div className="wip-wrap">
          <TitreSection
            accent="var(--d25)"
            index="01"
            oeil="Planning"
            titre="Les horaires, semaine type"
            intro="Cours de cross-training, préparation Hyrox et pole dance, du lundi au samedi, de 6h30 à 21h45. Tout est affiché : vous savez ce qui vous attend avant de pousser la porte."
          />

          <div className="wip-legende wip-rev">
            {Object.values(DISCIPLINES).map((d) => (
              <span key={d.nom}>
                <Pastille d={d} />
                <span className="wip-mono" style={{ color: "var(--fonte)" }}>{d.nom}</span>
              </span>
            ))}
          </div>

          <div className="wip-planning wip-rev">
            {PLANNING.map((j) => (
              <div className="wip-jour" key={j.jour}>
                <div className="wip-jour-tete">
                  <strong>{j.jour}</strong>
                </div>
                {j.creneaux.map(([h, code]) => (
                  <div
                    className="wip-creneau"
                    key={h + code}
                    style={{ "--c": DISCIPLINES[code].c }}
                  >
                    <b>{h}</b>
                    <span>
                      <Pastille d={DISCIPLINES[code]} />
                      {DISCIPLINES[code].nom}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="wip-note wip-rev">
            <span className="wip-mono">Dimanche : open gym 9h – 13h</span>
            <span className="wip-mono">Chaque cours a une version adaptée aux débutants</span>
            <span className="wip-mono">12 personnes maximum par créneau</span>
          </div>
        </div>
      </section>

      {/* ————— première fois ————— */}
      <section className="wip-wrap wip-sec sans-trait" id="premiere-fois">
        <TitreSection
          accent="var(--bleu)"
          index="02"
          oeil="Première visite"
          titre="La première fois, ça se passe comme ça"
          intro="Trois étapes, dans cet ordre, sans surprise. Vous décidez à la fin — pas au début."
        />

        <div className="wip-etapes wip-rev">
          <div className="wip-etape">
            <span className="wip-etape-n">01</span>
            <h3>Vous réservez un créneau</h3>
            <p>
              Un formulaire, trois champs. On vous rappelle dans la journée pour caler
              l'heure qui vous arrange, y compris en dehors des cours.
            </p>
            <span className="wip-mono">2 minutes</span>
          </div>
          <div className="wip-etape">
            <span className="wip-etape-n">02</span>
            <h3>On visite, on discute</h3>
            <p>
              Tour du lieu, présentation des espaces. On parle de votre passé sportif,
              de vos douleurs, de vos horaires. Et de ce qui vous fait hésiter.
            </p>
            <span className="wip-mono">20 minutes</span>
          </div>
          <div className="wip-etape">
            <span className="wip-etape-n">03</span>
            <h3>Vous bougez pour de vrai</h3>
            <p>
              Une séance construite pour vous, avec un coach, sans le reste du groupe.
              Puis on vous laisse partir sans rien vous faire signer.
            </p>
            <span className="wip-mono">45 minutes · offert</span>
          </div>
        </div>
      </section>

      {/* ————— espaces ————— */}
      <section className="wip-wrap wip-sec" id="espaces">
        <TitreSection
          accent="var(--d15)"
          index="03"
          oeil="Quatre espaces"
          titre="Chacun sa couleur, chacun son rythme"
          intro="On a repris le code des disques olympiques : rouge, jaune, noir, blanc. Vous saurez toujours où vous allez, et vous n'êtes jamais obligé d'aller ailleurs."
        />

        <div className="wip-espaces wip-rev">
          {ESPACES.map((e) => {
            const on = ouvert === e.id;
            return (
              <div className={on ? "wip-espace on" : "wip-espace"} key={e.id}>
                <button
                  className="wip-espace-tete"
                  onClick={() => setOuvert(on ? null : e.id)}
                  aria-expanded={on}
                >
                  <span
                    className="wip-disque"
                    style={{
                      background: e.inverse ? "var(--magnesie)" : "var(--fonte)",
                      borderColor: e.disque,
                      color: e.inverse ? "var(--fonte)" : e.disque,
                    }}
                  >
                    {e.n}
                  </span>
                  <span className="wip-espace-nom">{e.nom}</span>
                  <span className="wip-espace-meta">{e.meta}</span>
                  <span className={on ? "wip-croix on" : "wip-croix"} aria-hidden="true" />
                </button>

                <div className={on ? "wip-espace-corps on" : "wip-espace-corps"}>
                  <div>
                    <div className="wip-espace-in">
                      <span />
                      <p>{e.texte}</p>
                      <div className="wip-fiche">
                        {e.fiche.map(([k, v]) => (
                          <div key={k}>
                            <span className="wip-mono">{k}</span>
                            <span>{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ————— pourquoi ce nom ————— */}
      <section className="wip-nom">
        <Symbole className="wip-nom-filigrane" />
        <div className="wip-wrap">
          <TitreSection
            accent="var(--magnesie)"
            index="04"
            oeil="Pourquoi ce nom"
            titre="Trois verbes, et aucun n'est un niveau à atteindre"
          />

          <div className="wip-nom-grid wip-rev">
            {MOTS.map((m) => (
              <div
                className="wip-nom-col"
                key={m.mot}
                style={{ borderTopColor: m.couleur }}
              >
                <h3>{m.mot}</h3>
                <p>{m.glose}</p>
              </div>
            ))}
          </div>

          <div className="wip-sign">
            <span className="wip-mono">Sébastien, Clément &amp; Marion — fondateurs</span>
            <span className="wip-mono">Amboise, 2026</span>
          </div>
        </div>
      </section>

      {/* ————— équipe ————— */}
      <section className="wip-wrap wip-sec sans-trait" id="equipe">
        <TitreSection
          accent="var(--fonte)"
          index="05"
          oeil="L'équipe"
          titre="Vous choisissez une salle pour ses coachs"
          intro="Trois personnes, trois spécialités, la même façon de corriger : à voix basse, à côté de vous, jamais devant le groupe."
        />

        <div className="wip-equipe wip-rev">
          {EQUIPE.map((c) => (
            <div key={c.role}>
              <div className="wip-photo" style={{ minHeight: 320 }}>
                <span>{c.shot}</span>
              </div>
              <h3>{c.prenom}</h3>
              <p className="wip-mono" style={{ marginTop: 7 }}>{c.role}</p>
              <p style={{ marginTop: 13, fontSize: 15, lineHeight: 1.62, color: "var(--encre)" }}>
                {c.parcours}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ————— formules & contact ————— */}
      <section className="wip-sec pose" id="tarifs">
        <div className="wip-wrap">
          <TitreSection
            accent="var(--bleu)"
            index="06"
            oeil="Formules"
            titre="On préfère en parler de vive voix"
            intro="Les formules dépendent de ce que vous voulez pratiquer, de votre rythme et de vos horaires. Plutôt qu'une grille qui ne correspondra à personne, on préfère en discuter cinq minutes au téléphone puis vous accueillir sur place pour une séance d'essai."
          />

          <div className="wip-formules wip-rev">
            {FORMULES.map((f) => (
              <div className="wip-formule" key={f.nom}>
                <h3>{f.nom}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="wip-appel wip-rev wip-coupe wip-coupe-l">
            <div>
              <span className="wip-mono">Réserver</span>
              <h3>Appelez-nous, on vous cale une séance d'essai cette semaine.</h3>
              <p>
                Cinq minutes au téléphone pour comprendre ce que vous cherchez, puis on en discute
                tranquillement sur place, après la séance. Aucun engagement à prendre le jour même.
              </p>
            </div>
            <div>
              <span className="wip-mono">Du lundi au samedi, 9h – 20h</span>
              <a href="tel:+33780335321" className="wip-tel" style={{ marginTop: 10 }}>
                07 80 33 53 21
              </a>
              <div style={{ marginTop: 20 }}>
                <a href="#reserver" className="wip-cta">
                  Être rappelé<i aria-hidden="true">→</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ————— questions ————— */}
      <section className="wip-wrap wip-sec sans-trait">
        <TitreSection
          accent="var(--d25)"
          index="07"
          oeil="Ce qu'on nous dit le plus souvent"
          titre="Les quatre phrases qu'on entend au téléphone"
        />
        <div className="wip-q wip-rev">
          {QUESTIONS.map((q) => (
            <div className="wip-q-item" key={q.q}>
              <h3>{q.q}</h3>
              <p>{q.r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ————— lieu ————— */}
      <section className="wip-wrap wip-sec" id="lieu">
        <TitreSection
          accent="var(--d15)"
          index="08"
          oeil="Le lieu"
          titre="Un ancien bâtiment industriel à dix minutes du centre d'Amboise"
        />
        <div className="wip-lieu wip-rev">
          <div>
            <p style={{ marginTop: 0, fontSize: 17, lineHeight: 1.62, color: "var(--encre)", maxWidth: 460 }}>
              1 000 m² sous charpente, hauteur libre de 4,20 m, parking gratuit devant la porte.
              Vestiaires neufs, douches individuelles, accès PMR complet.
            </p>
            <div className="wip-fiche-lieu">
              {[
                ["Adresse", "1329 chemin du Roi, 37400 Amboise"],
                ["Ouverture", "samedi 31 octobre 2026"],
                ["Horaires", "lun–ven 6h–22h · sam 8h–18h"],
                ["Parking", "gratuit, 40 places"],
              ].map(([k, v]) => (
                <div key={k}>
                  <span className="wip-mono">{k}</span>
                  <span className="wip-mono">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="wip-carte wip-coupe wip-coupe-l">
            <div className="wip-carte-vue">
              <iframe
                title="Carte — WIP Athletics, 1329 chemin du Roi, 37400 Amboise"
                src="https://www.google.com/maps?q=1329+chemin+du+Roi,+37400+Amboise,+France&z=15&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="wip-carte-pied">
              <span className="wip-mono">1329 chemin du Roi · 37400 Amboise</span>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=1329+chemin+du+Roi,+37400+Amboise,+France"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ouvrir l'itinéraire<i aria-hidden="true" style={{ fontStyle: "normal", fontFamily: "var(--mono)", fontSize: 11 }}>↗</i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ————— final ————— */}
      <section className="wip-final" id="reserver">
        <div className="wip-wrap wip-rev">
          <h2>Venez voir.<br />C'est tout ce qu'on demande.</h2>
          <p>
            45 minutes, offertes, sans engagement. Le pire qui puisse arriver,
            c'est que vous repartiez en ayant visité une belle salle.
          </p>
          <a href="#reserver" className="wip-cta" style={{ padding: "17px 30px", fontSize: 15 }}>
            Réserver ma séance découverte<i aria-hidden="true">→</i>
          </a>
          <p className="wip-mono" style={{ marginTop: 24 }}>
            Ou écrivez-nous — on répond nous-mêmes
          </p>
        </div>
      </section>

      {/* ————— pied ————— */}
      <footer className="wip-pied">
        <div className="wip-wrap">
          <div className="wip-pied-grid">
            <div>
              <h4>La salle</h4>
              <ul>
                <li><a href="#espaces">Les quatre espaces</a></li>
                <li><a href="#planning">Planning des cours</a></li>
                <li><a href="#tarifs">Formules et essai</a></li>
                <li><a href="#equipe">Les coachs</a></li>
                <li><a href="#premiere-fois">Première visite</a></li>
              </ul>
            </div>
            <div>
              <h4>Nos activités</h4>
              <ul>
                <li>Cross-training à Amboise</li>
                <li>Préparation Hyrox</li>
                <li>Pole dance et aérien</li>
                <li>Open gym en accès libre</li>
              </ul>
            </div>
            <div>
              <h4>Nous trouver</h4>
              <ul>
                <li>1329 chemin du Roi</li>
                <li>37400 Amboise, Indre-et-Loire</li>
                <li>Nazelles-Négron · Pocé-sur-Cisse</li>
                <li>Montlouis-sur-Loire · Bléré</li>
                <li>Château-Renault · Tours Est</li>
                <li>Parking gratuit, 40 places</li>
              </ul>
            </div>
            <div>
              <h4>Nous parler</h4>
              <ul>
                <li><a href="tel:+33780335321">07 80 33 53 21</a></li>
                <li><a href="https://instagram.com/wip.athletic">@wip.athletic</a></li>
                <li>bonjour@wipathletics.fr</li>
                <li>Mentions légales · CGV</li>
              </ul>
            </div>
          </div>

          <div className="wip-pied-logo">
            <Lockup />
          </div>
          <p className="wip-pied-devise">Work · Improve · Progress</p>
          <p className="wip-pied-legal">
            WIP Athletics · SARL en cours de constitution · Salle de cross-training et de fitness
            fonctionnel à Amboise, Indre-et-Loire · Ouverture le samedi 31 octobre 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
