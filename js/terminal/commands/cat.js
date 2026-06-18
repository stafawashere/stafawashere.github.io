defineCommand({
  name: 'cat', aliases: ['less', 'more', 'read'], group: 'core',
  summary: 'cat <project> — read a project file',
  run(ctx) {
    const o = ctx.out;
    if (!ctx.argl) return o.line(o.dim('usage: '), o.accent('cat <project>', 600), o.dim('   (try '), o.accent('cat about.txt', 600), o.dim(')'));
    if (/^about/.test(ctx.argl)) return ctx.runCommand('about');
    if (/secret/.test(ctx.argl)) return ctx.runCommand('secret');

    const p = ctx.findProject(ctx.argl);
    if (!p) return o.line(o.error('cat: ', 700), o.warn(ctx.arg), o.txt(': No such file. Try '), o.accent('ls projects', 600), o.dim('.'));

    const acc = ctx.C.acc;
    return o
      .line(o.color('┌─ ', acc), o.bold(p.name), o.accent('  ' + p.type, 400))
      .line(o.color('│  ', acc), o.dim(p.stack))
      .line(o.color('│', acc))
      .line(o.color('│  ', acc), o.txt(p.blurb))
      .line(o.color('│', acc))
      .line(o.color('└─ ', acc), o.link(p.url.replace('https://', ''), p.url), o.dim('  ' + p.date + '  ↗'));
  },
});
