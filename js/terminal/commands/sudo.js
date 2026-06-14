defineCommand({
  name: 'sudo', aliases: ['doas'], group: 'core',
  summary: 'escalate privileges — try `sudo hire`',
  run(ctx) {
    const o = ctx.out, argl = ctx.argl;
    if (/^hire/.test(argl) || argl === 'me' || /employ|recruit/.test(argl)) {
      ctx.openUrl('mailto:contact@mahfujmustafa.dev?subject=Let’s%20work%20together');
      return o
        .line(o.dim('[sudo] '), o.txt('password for visitor: '), o.faint('••••••••'))
        .line(o.txt('Privilege escalation '), o.ok('successful', 700), o.txt('. You now have hire access.'))
        .blank()
        .line(o.dim('opening mail composer → '), o.link('contact@mahfujmustafa.dev ↗', 'mailto:contact@mahfujmustafa.dev?subject=Let’s%20work%20together'));
    }
    return o
      .line(o.dim('[sudo] '), o.txt('password for visitor: '), o.faint('••••'))
      .line(o.error('Sorry, try again. '), o.dim('This incident has been reported.'))
      .line(o.dim('(the only command worth '), o.accent('sudo', 400), o.dim(' is '), o.accent('sudo hire'), o.dim(')'));
  },
});

// help-only entry so it shows in `help --all`
defineCommand({
  name: 'sudo hire', usage: 'sudo hire', group: 'system',
  summary: 'escalate privileges — opens a pre-filled email',
  run(ctx) { return ctx.runCommand('sudo', 'hire'); },
});

defineCommand({
  name: 'hire',
  run(ctx) { return ctx.runCommand('sudo', 'hire'); },
});
