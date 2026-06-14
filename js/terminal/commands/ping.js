defineCommand({
  name: 'ping', group: 'system',
  summary: 'ping the box — all replies alive',
  run(ctx) {
    const o = ctx.out;
    return o
      .line(o.txt('PING ' + (ctx.arg || 'mahfujmustafa.dev') + ' — 56 bytes'))
      .line(o.txt('64 bytes from core: icmp_seq=1 ttl=64 '), o.ok('time=0.042 ms'))
      .line(o.txt('64 bytes from core: icmp_seq=2 ttl=64 '), o.ok('time=0.038 ms'))
      .line(o.dim('--- alive and well ---'));
  },
});
