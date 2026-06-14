defineCommand({
  name: 'sl', group: 'system',
  summary: 'for when you fat-finger `ls`',
  run(ctx) { return ctx.out.line(ctx.out.warn('🚂 woo woo — you meant `ls`. (we don’t do emoji here)')); },
});
