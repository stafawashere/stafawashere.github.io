defineCommand({
  name: 'rootkit', aliases: ['persist'], group: 'root', root: true,
  summary: 'install a (fake) rootkit',
  run(ctx) {
    const o = ctx.out;
    return o
      .line(o.txt('installing rootkit '), o.dim('(jk)'), o.txt(' ...'))
      .line(o.dim('  → hooking syscalls ........ '), o.ok('nope', 700))
      .line(o.dim('  → hiding from '), o.accent('ps aux', 400), o.dim(' ....... '), o.ok('also nope', 700))
      .line(o.txt('  the only thing persisting here is my interest in shipping good software.'));
  },
});
