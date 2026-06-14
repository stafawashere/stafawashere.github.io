// ls projects, ls skills etc. just delegate to the matching command
defineCommand({
  name: 'ls', aliases: ['dir', 'll'], group: 'core',
  summary: 'list the filesystem — try `ls projects`',
  run(ctx) {
    const o = ctx.out;
    const a = ctx.argl.replace(/^-\S+\s*/, '').trim();
    if (/^projects?\/?$/.test(a))  return ctx.runCommand('projects');
    if (/^experien|^jobs/.test(a)) return ctx.runCommand('experience');
    if (/^educa|^school/.test(a))  return ctx.runCommand('education');
    if (/^skills?\/?$/.test(a))    return ctx.runCommand('skills');
    if (a) return o.line(o.error('ls: ', 700), o.txt('cannot access '), o.warn(a), o.txt(': No such directory'));

    return o
      .line(
        o.txt('about.txt   '),
        o.cmd('projects/   ', 'projects'),
        o.cmd('experience/   ', 'experience'),
        o.cmd('education/   ', 'education'),
        o.cmd('skills/   ', 'skills'),
        o.cmd('contact/   ', 'contact'),
        o.faint('.secret'),
      )
      .line(o.dim('drwxr-xr-x  6 dirs   ·  '), o.faint('run `cat <project>` to read one'));
  },
});
