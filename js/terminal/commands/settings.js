defineCommand({
  name: 'settings', aliases: ['gear', 'tweaks'], group: 'system',
  summary: 'show / hide the animation settings button',
  run(ctx) {
    const o = ctx.out;
    if (typeof window.curieToggleSettingsButton !== 'function') {
      return o.line(o.warn('Settings panel is still loading — try again in a second.'));
    }
    const shown = window.curieToggleSettingsButton();
    if (shown) {
      o.line(o.ok('✓ '), o.txt('Settings button '), o.accent('shown'), o.txt(' — top-right of the nav bar, next to search.'));
      o.line(o.dim('Run '), o.cmd('settings', 'settings'), o.dim(' again to hide it. Your choice is saved.'));
    } else {
      o.line(o.txt('Settings button '), o.accent('hidden'), o.txt('.'));
      o.line(o.dim('Run '), o.cmd('settings', 'settings'), o.dim(' to bring it back.'));
    }
    return o;
  },
});
