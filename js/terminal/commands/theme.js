defineCommand({
  name: 'theme', aliases: ['color'], group: 'system',
  summary: 'change the color theme (good luck)',
  run(ctx) { return ctx.out.line(ctx.out.txt('The only theme is '), ctx.out.accent('purple'), ctx.out.txt('. Cope.')); },
});
