// builds command output. each command gets a fresh ctx.out and chains calls onto it.
// a line is { segs:[segment] } or { node: HTMLElement }. a segment is
// { text, style, cmd?, open? } where cmd makes it click-to-run and open makes it a link.

class Output {
  constructor(palette) {
    this.C = palette;
    this.lines = [];
  }

  static pad(text, width) {
    text = String(text);
    return text.length >= width ? text : text + ' '.repeat(width - text.length);
  }

  push(line) { this.lines.push(line); return this; }

  // A styled text segment. color/weight optional.
  seg(text, color, weight) {
    return {
      text:  text == null ? '' : String(text),
      style: 'color:' + (color || this.C.txt) + ';' + (weight ? 'font-weight:' + weight + ';' : ''),
    };
  }

  // A line from mixed parts: strings become default text, segments pass through.
  line(...parts) {
    const segs = parts.length
      ? parts.map(p => (typeof p === 'string' || typeof p === 'number') ? this.seg(p) : p)
      : [this.seg(' ')];
    return this.push({ segs });
  }

  blank()    { return this.push({ segs: [this.seg(' ')] }); }
  node(el)   { return this.push({ node: el }); }
  raw(lines) { (lines || []).forEach(l => this.push(l)); return this; }

  txt(t, w)    { return this.seg(t, this.C.txt, w); }
  dim(t, w)    { return this.seg(t, this.C.dim, w); }
  faint(t, w)  { return this.seg(t, this.C.faint, w); }
  accent(t, w) { return this.seg(t, this.C.p, w || 700); }
  white(t, w)  { return this.seg(t, this.C.w, w); }
  bold(t)      { return this.seg(t, this.C.w, 700); }
  ok(t, w)     { return this.seg(t, this.C.ok, w); }
  warn(t, w)   { return this.seg(t, this.C.warn, w); }
  error(t, w)  { return this.seg(t, this.C.err, w); }
  color(t, c, w) { return this.seg(t, c, w); }

  // Interactive segments.
  link(text, url, color, weight) {
    return Object.assign(this.seg(text, color || this.C.p, weight || 600), { open: url });
  }
  cmd(text, command, color, weight) {
    return Object.assign(this.seg(text, color || this.C.p, weight || 700), { cmd: command });
  }

  heading(text) { return this.line(this.bold(text)); }

  // A horizontal rule drawn from a repeated character.
  rule(width, char, color) {
    return this.line(this.seg(String(char || '─').repeat(width || 48), color || this.C.faint));
  }

  // Aligned "key   value" row, neofetch-style.
  kv(key, value, opts) {
    opts = opts || {};
    const w = opts.keyWidth || 12;
    return this.line(
      this.seg(Output.pad(key, w), opts.keyColor || this.C.p, 600),
      (typeof value === 'string' || typeof value === 'number')
        ? this.seg(value, opts.valueColor || this.C.txt)
        : value,
    );
  }

  // A bulleted list. `items` are strings or segments.
  list(items, bullet, color) {
    (items || []).forEach(it => this.line(
      this.seg('  ' + (bullet || '•') + ' ', color || this.C.p),
      (typeof it === 'string' || typeof it === 'number') ? this.seg(it) : it,
    ));
    return this;
  }

  // An auto-aligned table. `rows` is an array of arrays; cells are strings or
  // segments (segments keep their color, just get padded to the column width).
  table(rows, opts) {
    opts = opts || {};
    const gap = opts.gap == null ? 2 : opts.gap;
    const indent = opts.indent == null ? '  ' : opts.indent;
    const textOf = c => (c && typeof c === 'object' && 'text' in c) ? c.text : String(c);

    const widths = [];
    rows.forEach(r => r.forEach((c, i) => {
      const len = textOf(c).length;
      if (widths[i] == null || len > widths[i]) widths[i] = len;
    }));

    rows.forEach(r => {
      const segs = [this.seg(indent)];
      r.forEach((c, i) => {
        const last = i === r.length - 1;
        const padded = last ? textOf(c) : Output.pad(textOf(c), widths[i] + gap);
        segs.push((c && typeof c === 'object' && 'text' in c)
          ? Object.assign({}, c, { text: padded })
          : this.txt(padded));
      });
      this.push({ segs });
    });
    return this;
  }
}

window.Output = Output;
