defineCommand({
  name: 'help', aliases: ['commands', '?'],
  summary: 'list the commands (try `help --all`)',
  run(ctx) {
    const o = ctx.out;
    const all = !!(ctx.flags.all || ctx.flags.a || /^(all|hidden|full|everything)$/.test(ctx.argl.trim()));
    const row = (c, color) => o.line(o.cmd(Output.pad(c.usage || c.name, 14), c.name, color), o.txt(c.summary));

    o.line(o.bold('Available commands '), o.dim('— click any to run')).blank();
    ctx.registry.group('core').forEach(c => row(c));

    if (!all) {
      o.blank().line(o.dim('  psst — run '), o.cmd('help --all', 'help --all'), o.dim(' to reveal the hidden ones.'));
      return o;
    }

    o.blank().line(o.warn('Hidden ', 700), o.dim('— easter eggs & extras')).blank();
    ctx.registry.group('system').forEach(c => row(c, ctx.C.warn));

    o.blank().line(o.error('Root-only ', 700), o.dim('— unlock with '), o.accent('↑↑↓↓←→←→ B A')).blank();
    ctx.registry.group('root').forEach(c => ctx.root
      ? row(c, ctx.C.err)
      : o.line(o.faint(Output.pad(c.usage || c.name, 14), 700), o.faint(c.summary), o.faint('  [locked]')));
    return o;
  },
});
