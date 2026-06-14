defineCommand({
  name: 'experience', aliases: ['jobs', 'work-history'], group: 'core',
  summary: 'work history (alias: history)',
  run(ctx) {
    const o = ctx.out, exp = ctx.data.experiences;
    exp.forEach((x, i) => {
      o.line(o.accent('● ', 400), o.bold(Output.pad(x.org, 12)), o.txt(x.role), o.dim('  ' + x.dates));
      o.line(o.dim('  '), o.txt(x.note));
      if (i < exp.length - 1) o.blank();
    });
    return o;
  },
});
