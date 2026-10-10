defineCommand({
  name: 'whoami', aliases: ['who'], group: 'core',
  summary: 'who is running this shell',
  run(ctx) {
    const o = ctx.out;
    if (ctx.root) {
      return o
        .line(o.error('root', 700), o.dim('  (uid=0)'))
        .line(o.txt('You escalated. Respect. Underneath the root shell it’s still '), o.bold('Mahfuj Mustafa'), o.txt(','))
        .line(o.accent('17 y/o security analyst who left this door unlocked on purpose.', 400));
    }
    return o
      .line(o.bold('Mahfuj Mustafa'))
      .line(o.accent('17 y/o student developer and security analyst, New York City', 400))
      .line(o.txt('Interested in CS, ML, and Neuroscience'))
      .blank()
      .line(o.txt('"I break things to understand them."'))
      .line(o.bold('78M+ '), o.dim('player visits shipped  ·  '), o.ok('● '), o.txt('class of 2027'));
  },
});
