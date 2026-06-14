defineCommand({
  name: 'contact', aliases: ['reach'], group: 'core',
  summary: 'how to reach me',
  run(ctx) {
    const o = ctx.out;
    return o
      .line(o.ok('● '), o.txt('available for work'), o.dim('  —  freelance & full-time'))
      .blank()
      .line(o.dim('email   '), o.link('contact@mahfujmustafa.dev', 'mailto:contact@mahfujmustafa.dev'), o.color('  ↗', ctx.C.acc))
      .line(o.dim('phone   '), o.txt('(347) 844-4127'))
      .line(o.dim('github  '), o.link('github.com/stafawashere', 'https://github.com/stafawashere'), o.color('  ↗', ctx.C.acc))
      .line(o.dim('where   '), o.txt('New York City, NY'))
      .blank()
      .line(o.color('→ ', ctx.C.acc), o.accent('sudo hire'), o.dim(' if you’re serious.'));
  },
});
