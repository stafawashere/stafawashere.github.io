defineCommand({
  name: 'about', aliases: ['bio'], group: 'core',
  summary: 'print about.txt — the full bio',
  run(ctx) {
    return ctx.out
      .line(ctx.out.dim('about.txt'))
      .blank()
      .line('I’m a 17-year-old high school student in NYC who breaks things to')
      .line('understand them. I work across security research, reverse engineering,')
      .line('full-stack web, Discord bots, API wrappers and automation — and I ship')
      .line('live games that have reached ', ctx.out.bold('78M+ player visits'), '.')
      .blank()
      .line(ctx.out.dim('Currently: '), ctx.out.accent('Programmer @ Merge Box', 400), ctx.out.dim('  ·  freelancing'));
  },
});
