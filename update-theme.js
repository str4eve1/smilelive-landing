import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src/pages/Index.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replacements for light theme
const replacements = [
  { search: /text-white\/50/g, replace: 'text-text-muted' },
  { search: /text-white\/60/g, replace: 'text-text-muted' },
  { search: /text-white\/80/g, replace: 'text-text-main' },
  { search: /text-white/g, replace: 'text-text-main' },
  { search: /border-white\/5/g, replace: 'border-secondary/10' },
  { search: /border-white\/10/g, replace: 'border-secondary/20' },
  { search: /border-white\/20/g, replace: 'border-secondary/30' },
  { search: /border-white\/30/g, replace: 'border-secondary/40' },
  { search: /bg-white\/5/g, replace: 'bg-secondary/5' },
  { search: /bg-white\/10/g, replace: 'bg-secondary/10' },
  { search: /bg-white\/20/g, replace: 'bg-secondary/20' },
  { search: /bg-white/g, replace: 'bg-surface' }, 
  { search: /bg-black/g, replace: 'bg-surface-elevated' },
  { search: /from-white\/5/g, replace: 'from-secondary/10' },
  { search: /from-\[\#030712\]/g, replace: 'from-surface/50' },
  { search: /bg-surface-elevated\/50/g, replace: 'bg-surface-elevated' },
];

replacements.forEach(({ search, replace }) => {
  content = content.replace(search, replace);
});

// Fix some specific cases where bg-surface should be a solid color or primary
content = content.replace(/bg-surface shadow-\[0_0_10px_rgba\(255,255,255,0\.8\)\]/g, 'bg-primary shadow-[0_0_10px_rgba(2,132,199,0.5)]');
content = content.replace(/bg-surface shadow-\[0_0_20px_rgba\(0,0,0,0\.5\)\]/g, 'bg-primary shadow-[0_0_20px_rgba(2,132,199,0.5)]');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Index.tsx updated');
