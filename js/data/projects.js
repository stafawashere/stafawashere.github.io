// id is used by the terminal cat/open commands, keep it unique

window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.projects = [
  {
    id:   'distribution-network',
    name: 'Distribution Network',
    type: 'Full-Stack Web App',
    date: 'MAR 2026',
    url:  'https://github.com/stafawashere/dms',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    desc: 'Distributor management system with role-based admin & reseller portals, per-user inventory tracking, bulk pricing tiers, flexible sale pricing, and revenue analytics.',
  },
  {
    id:   'allusion',
    name: 'Allusion',
    type: 'Security Research',
    date: 'FEB 2026',
    url:  'https://github.com/stafawashere/Allusion',
    tech: ['Lua'],
    desc: 'Reverse-engineered Rivals\' client to find vulnerabilities across anti-cheat, combat, and rendering systems. Responsibly disclosed before open-sourcing.',
  },
  {
    id:   'disky',
    name: 'Disky',
    type: 'Discord API Wrapper',
    date: 'MAY 2024',
    url:  'https://github.com/stafawashere/Disky',
    tech: ['Python', 'WebSockets'],
    desc: 'A Discord API wrapper built from scratch over raw WebSockets & HTTP — gateway events, session management, and browser fingerprinting, no existing libraries.',
  },
  {
    id:   'ledger',
    name: 'Ledger',
    type: 'Discord Bot',
    date: 'FEB 2026',
    url:  'https://github.com/stafawashere/ledger',
    tech: ['Python', 'TinyDB'],
    desc: 'Tracks balance, debts & inventory via slash commands and interactive UI — modular cog architecture, TinyDB storage, full audit history with filtering & export.',
  },
  {
    id:   'portfolio',
    name: 'mahfujmustafa.dev',
    type: 'Portfolio Website',
    date: 'MAR 2025',
    url:  'https://github.com/stafawashere/stafawashere.github.io',
    tech: ['JavaScript'],
    desc: 'Personal portfolio built with EJS templating, custom terminal-inspired CSS, and automated builds.',
  },
];
