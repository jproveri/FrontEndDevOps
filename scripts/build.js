const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
function copyR(s, d) { const st = fs.statSync(s); if (st.isDirectory()) { if (!fs.existsSync(d)) fs.mkdirSync(d, {recursive:true}); fs.readdirSync(s).forEach(c => copyR(path.join(s,c), path.join(d,c))); } else { fs.copyFileSync(s, d); } }
if (fs.existsSync(DIST)) fs.rmSync(DIST, {recursive:true, force:true});
fs.mkdirSync(DIST);
['index.html','pages','assets'].forEach(e => copyR(path.join(ROOT,e), path.join(DIST,e)));
fs.writeFileSync(path.join(DIST,'.nojekyll'),'');
console.log('Build OK');
