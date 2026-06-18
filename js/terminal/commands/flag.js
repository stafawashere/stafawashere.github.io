defineCommand({
  name: 'flag', group: 'root', root: true,
  summary: 'cat the CTF flag',
  run(ctx) {
    const o = ctx.out, err = ctx.C.err;
    return o
      .line(o.dim('cat /root/flag.txt'))
      .blank()
      .line(o.color('  ┌────────────────────────────────────────────────┐', err))
      .line(o.color('  │  ', err), o.ok('flag{', 700), o.warn('you_read_the_source_you_beautiful_nerd', 700), o.ok('}', 700), o.color('  │', err))
      .line(o.color('  └────────────────────────────────────────────────┘', err))
      .blank()
      .line(o.txt('  if you got here, we should talk. '), o.cmd('sudo hire', 'sudo hire', err), o.dim('.'));
  },
});
