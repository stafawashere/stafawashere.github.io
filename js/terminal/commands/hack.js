defineCommand({
  name: 'hack', aliases: ['matrix'], group: 'system',
  summary: 'definitely "hack the mainframe" (matrix too)',
  async run(ctx) {
    await ctx.type('01001101 01000001 01001000 01000110 01010101 01001010', { color: ctx.C.ok, speed: 22 });
    await ctx.sleep(120);
    return ctx.out.line(ctx.out.ok('[ access granted ] ', 700), ctx.out.txt('jk — there’s nothing to hack. It’s a portfolio.'));
  },
});
