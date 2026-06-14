defineCommand({
  name: 'coffee', aliases: ['brew'], group: 'system',
  summary: 'HTTP 418 — I\'m a teapot',
  run(ctx) {
    return ctx.out.line(ctx.out.error('418 ', 700), ctx.out.txt("I'm a teapot. Can't brew coffee over HTTP (RFC 2324)."));
  },
});
