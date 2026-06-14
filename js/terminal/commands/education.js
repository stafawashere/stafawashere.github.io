// data lives in js/data/education.js
defineCommand({
  name: 'education', aliases: ['edu', 'school'], group: 'core',
  summary: 'where I study',
  run(ctx) {
    const o = ctx.out, edu = ctx.data.education;
    edu.forEach((e, i) => {
      o.line(o.accent('● ', 400), o.bold(e.name), o.accent('  ' + e.kind, 400), o.dim('  ' + e.dates));
      o.line(o.dim('  '), o.txt(e.note));
      if (i < edu.length - 1) o.blank();
    });
    return o;
  },
});
