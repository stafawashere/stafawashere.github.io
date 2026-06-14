// node built in banners.js
defineCommand({
  name: 'neofetch', aliases: ['fetch', 'screenfetch'], group: 'core',
  summary: 'system info readout',
  run(ctx) { return ctx.out.node(ctx.neofetch()); },
});
