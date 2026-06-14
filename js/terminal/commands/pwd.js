defineCommand({
  name: 'pwd', group: 'system',
  summary: 'print working directory',
  run(ctx) { return ctx.out.line(ctx.out.txt('/home/visitor')); },
});
