defineCommand({
  name: 'vim', aliases: ['vi', 'nano', 'emacs'], usage: 'vim', group: 'system',
  summary: 'enter the inescapable editor (:q to flee)',
  run(ctx) {
    ctx.setVim(true);
    return ctx.out.line(
      ctx.out.txt('Entering '), ctx.out.accent(ctx.name), ctx.out.txt('. Good luck getting out. (hint: '),
      ctx.out.accent(':q', 400), ctx.out.dim(')'),
    );
  },
});
