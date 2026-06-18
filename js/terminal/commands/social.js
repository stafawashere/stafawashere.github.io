defineCommand({
  name: 'social', aliases: ['links'], group: 'core',
  summary: 'links & handles',
  run(ctx) {
    const o = ctx.out, acc = ctx.C.acc;
    return o
      .line(o.dim('GitHub    '), o.link('github.com/stafawashere', 'https://github.com/stafawashere'), o.color('  ↗', acc))
      .line(o.dim('Email     '), o.link('contact@mahfujmustafa.dev', 'mailto:contact@mahfujmustafa.dev'), o.color('  ↗', acc))
      .line(o.dim('Phone     '), o.txt('(347) 844-4127'));
  },
});
