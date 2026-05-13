#!/usr/bin/env node
/**
 * Script de build do GameVerse.
 * Como o site é puramente estático (HTML/CSS/JS), este "build" apenas
 * valida a presença dos arquivos essenciais e copia tudo para a pasta dist/
 * para ser publicada pelo workflow de CD.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const REQUIRED = [
  'index.html',
  'pages/noticias.html',
  'pages/reviews.html',
  'pages/sobre.html',
  'pages/post.html',
  'assets/css/style.css',
  'assets/js/main.js',
  'assets/js/news.js',
  'assets/js/reviews.js',
  'assets/js/post.js',
  'assets/js/data.js'
];

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((child) => {
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function build() {
  console.log('🛠  GameVerse build iniciado...');
  REQUIRED.forEach((f) => {
    const full = path.join(ROOT, f);
    if (!fs.existsSync(full)) {
      console.error('✗ Arquivo obrigatório ausente: ' + f);
      process.exit(1);
    }
    console.log('✓ ' + f);
  });

  if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST);

  ['index.html', 'pages', 'assets'].forEach((entry) => {
    copyRecursive(path.join(ROOT, entry), path.join(DIST, entry));
  });

  fs.writeFileSync(path.join(DIST, '.nojekyll'), '');
  console.log('✅ Build concluído em ./dist');
}

build();
