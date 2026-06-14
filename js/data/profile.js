// every js/data file merges its slice into the same global PORTFOLIO object

window.PORTFOLIO = window.PORTFOLIO || {};

Object.assign(window.PORTFOLIO, {
  name:         'Mahfuj Mustafa',
  handle:       'mahfujmustafa',
  phone:        '(347) 844-4127',
  email:        'contact@mahfujmustafa.dev',
  location:     'New York City, NY',
  github:       'https://github.com/stafawashere',
  githubHandle: 'stafawashere',
  playerVisits: 78,   // millions
  available:    true,

  rotor: [
    'security researcher',
    'reverse engineer',
    'full-stack engineer',
    'live-ops developer',
    'bot architect',
  ],

  termChips: ['whoami', 'ls projects', 'cat allusion', 'sudo hire', 'neofetch', 'help'],
});
