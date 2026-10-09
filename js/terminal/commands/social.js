defineCommand({
  name: 'social', aliases: ['links'], group: 'core',
  summary: 'links & handles',
  run(ctx) {
    const o = ctx.out, acc = ctx.C.acc, p = ctx.data.portfolio;
    return o
      .line(o.dim('GitHub    '), o.link('github.com/stafawashere', 'https://github.com/stafawashere'), o.color('  ↗', acc))
      .line(o.dim('LinkedIn  '), o.link('linkedin.com/in/' + p.linkedinHandle, p.linkedin), o.color('  ↗', acc))
      .line(o.dim('ORCID     '), o.link('orcid.org/' + p.orcidId, p.orcid), o.color('  ↗', acc))
      .line(o.dim('Email     '), o.link('contact@mahfujmustafa.dev', 'mailto:contact@mahfujmustafa.dev'), o.color('  ↗', acc));
  },
});
