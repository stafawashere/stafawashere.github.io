defineCommand({
  name: 'rm', usage: 'rm -rf /', group: 'system',
  summary: 'try to delete everything (politely denied)',
  run(ctx) {
    const o = ctx.out, argl = ctx.argl;
    return /(-[a-z]*r[a-z]*f|-[a-z]*f[a-z]*r)/.test(argl) && /(\/|\*|~)/.test(argl)
      ? o.line(o.error('rm: ', 700), o.txt('refusing to nuke '), o.warn(argl), o.txt(' — this portfolio is immutable. Nice try, though.'))
      : o.line(o.error('rm: ', 700), o.txt('permission denied'));
  },
});
