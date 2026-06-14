defineCommand({
  name: 'echo', group: 'core',
  summary: 'echo <text> back at you',
  run(ctx) { return ctx.out.line(ctx.out.txt(ctx.arg || '')); },
});
