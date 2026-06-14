// small runnable commands that don't get their own help row

defineCommand({
  name: 'github', aliases: ['gh'],
  run(ctx) {
    ctx.openUrl('https://github.com/stafawashere');
    return ctx.out.line(ctx.out.dim('opening '), ctx.out.accent('github.com/stafawashere', 400), ctx.out.color('  ↗', ctx.C.acc));
  },
});

defineCommand({
  name: 'whoareyou',
  run(ctx) { return ctx.runCommand('whoami'); },
});

defineCommand({
  name: 'banner',
  run(ctx) { return ctx.out.node(ctx.banners.name(ctx.C, true)); },
});

defineCommand({
  name: 'cd',
  run(ctx) {
    const o = ctx.out;
    return o.line(o.txt('cd: this isn’t that kind of shell. Try '), o.accent('ls', 600), o.dim(' or '), o.accent('open <project>', 600), o.dim('.'));
  },
});
