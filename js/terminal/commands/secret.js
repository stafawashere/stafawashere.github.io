defineCommand({
  name: 'secret', aliases: ['.secret'], group: 'system',
  summary: 'decrypt .secret … if there is one',
  run(ctx) {
    const o = ctx.out;
    return o
      .line(o.dim('decrypting .secret ...'))
      .line(o.txt('There is no secret. Curiosity '), o.accent('is'), o.txt(' the brand. '), o.faint('psst — '), o.accent('↑↑↓↓←→←→ B A'), o.faint('.'));
  },
});
