// date command
defineCommand({
  name: 'date', aliases: ['time'], group: 'core',
  summary: 'current date & time',
  run(ctx) { return ctx.out.line(ctx.out.txt(new Date().toString())); },
});
