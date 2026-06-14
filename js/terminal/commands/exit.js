defineCommand({
  name: 'exit', aliases: ['logout', 'quit', ':q'], usage: 'exit', group: 'system',
  summary: 'log out (there is no logging out)',
  run(ctx) {
    const o = ctx.out;
    return o
      .line(o.dim('Connection to mahfujmustafa.dev closed.'))
      .line(o.txt('...just kidding. There is no escape — this is the whole site. Scroll on.'));
  },
});
