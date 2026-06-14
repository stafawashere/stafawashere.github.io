defineCommand({
  name: 'projects', aliases: ['work'], group: 'core',
  summary: 'list every project',
  run(ctx) {
    const o = ctx.out;
    const projects = ctx.data.projects;

    o.line(o.dim('projects/'), o.faint('  — ' + projects.length + ' entries')).blank();
    o.table(projects.map(p => [
      o.cmd(p.id, 'cat ' + p.id),
      o.txt(p.type),
      o.dim(p.date),
    ]), { gap: 3 });
    o.blank().line(o.color('  → ', ctx.C.acc), o.accent('cat <name>', 600), o.dim(' to read, '), o.accent('open <name>', 600), o.dim(' for GitHub'));
    return o;
  },
});
