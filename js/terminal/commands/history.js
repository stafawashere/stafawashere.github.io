defineCommand({
  name: 'history', group: 'system',
  summary: 'your command history',
  run(ctx) {
    if (ctx.arg) return ctx.runCommand('experience');
    const o = ctx.out;

    const h = ctx.shell.history.slice(0, -1).slice(-20);
    if (!h.length) return o.line(o.dim('(no history yet)'));
    h.forEach((c, i) => o.line(o.faint(Output.pad(String(i + 1), 4)), o.txt(c)));
    return o;
  },
});
