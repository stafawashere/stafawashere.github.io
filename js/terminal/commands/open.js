// open a project, github, or email in a new tab
defineCommand({
  name: 'open', aliases: ['xdg-open', 'start'], group: 'core',
  summary: 'open <project|github|email> in a new tab',
  run(ctx) {
    const o = ctx.out, argl = ctx.argl;
    if (!argl) return o.line(o.dim('usage: '), o.accent('open <project|github|email>', 600));

    if (/git|^gh$/.test(argl)) {
      ctx.openUrl('https://github.com/stafawashere');
      return o.line(o.dim('opening '), o.accent('github.com/stafawashere ↗', 400));
    }
    if (/mail|email|contact/.test(argl)) {
      ctx.openUrl('mailto:contact@mahfujmustafa.dev');
      return o.line(o.dim('opening '), o.accent('mail composer ↗', 400));
    }
    if (/resume|cv/.test(argl)) {
      return o.line(o.txt('No PDF here — the site '), o.accent('is'), o.txt(' the resume. Try '), o.accent('experience', 600), o.dim(' & '), o.accent('projects', 600), o.dim('.'));
    }

    const p = ctx.findProject(argl);
    if (!p) return o.line(o.error('open: ', 700), o.warn(argl), o.txt(': nothing to open'));
    ctx.openUrl(p.url);
    return o.line(o.dim('opening '), o.accent(p.url.replace('https://', '') + ' ↗', 400));
  },
});
