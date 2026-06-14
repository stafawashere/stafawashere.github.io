// manual pages built from each core command's summary
defineCommand({
  name: 'man', group: 'system',
  summary: 'man <cmd> — manual pages',
  run(ctx) {
    const o = ctx.out;
    if (!ctx.argl) return o.line(o.txt('What manual page do you want? Try '), o.accent('man whoami', 600), o.dim('.'));
    const cmd = ctx.registry.group('core').find(c => c.name === ctx.argl);
    if (!cmd) return o.line(o.txt('No manual entry for '), o.warn(ctx.argl));
    return o
      .line(o.accent('NAME'))
      .line(o.txt('    ' + cmd.name + ' — ' + cmd.summary));
  },
});
