class Palette {
  constructor(overlayEl, inputEl, listEl, emptyEl) {
    this.overlay = overlayEl;
    this.input   = inputEl;
    this.list    = listEl;
    this.empty   = emptyEl;

    this.sel      = 0;
    this.query    = '';
    this.isOpen   = false;
    this.onOpenWin = null;
    this.commands = [
      { id: 'terminal',   label: 'Interactive Shell',               hint: 'window',   icon: '$', type: 'win' },
      { id: 'skills',     label: 'Skills',                          hint: 'section',  icon: '#', type: 'scroll' },
      { id: 'experience', label: 'Experience',                      hint: 'section',  icon: '#', type: 'scroll' },
      { id: 'work',       label: 'Projects',                        hint: 'section',  icon: '#', type: 'scroll' },
      { id: 'education',  label: 'Education',                       hint: 'section',  icon: '#', type: 'scroll' },
      { id: 'contact',    label: 'Contact',                         hint: 'section',  icon: '#', type: 'scroll' },
      { label: 'GitHub — stafawashere',             hint: 'external', icon: '↗', type: 'link', url: 'https://github.com/stafawashere' },
      { label: 'Email — contact@mahfujmustafa.dev', hint: 'external', icon: '↗', type: 'link', url: 'mailto:contact@mahfujmustafa.dev' },
      { label: 'Call — (347) 844-4127',             hint: 'external', icon: '↗', type: 'link', url: 'tel:+13478444127' },
    ];

    this.input.addEventListener('input', () => {
      this.query = this.input.value;
      this.sel   = 0;
      this.render();
    });
  }

  open() {
    this.query = '';
    this.sel   = 0;
    this.isOpen = true;
    this.overlay.hidden = false;
    this.input.value = '';
    this.render();
    setTimeout(() => this.input.focus(), 40);
  }

  close() {
    this.isOpen = false;
    this.overlay.hidden = true;
  }

  toggle() { this.isOpen ? this.close() : this.open(); }

  filtered() {
    const q = this.query.trim().toLowerCase();
    return q ? this.commands.filter(c => c.label.toLowerCase().includes(q)) : this.commands;
  }

  render() {
    const items = this.filtered();
    this.list.innerHTML = '';
    this.empty.hidden = items.length > 0;

    items.forEach((cmd, i) => {
      const row = document.createElement('div');
      row.className = 'palette-row' + (i === this.sel ? ' is-selected' : '');
      row.innerHTML =
        '<span class="palette-icon">' + cmd.icon + '</span>' +
        '<span class="palette-label">' + cmd.label + '</span>' +
        '<span class="palette-hint">' + cmd.hint + '</span>';

      row.addEventListener('mouseenter', () => {
        this.sel = i;
        this.highlight();
      });
      row.addEventListener('click', () => this.exec(cmd));
      this.list.appendChild(row);
    });
  }

  highlight() {
    const rows = this.list.querySelectorAll('.palette-row');
    rows.forEach((r, i) => r.classList.toggle('is-selected', i === this.sel));
    const active = rows[this.sel];
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  move(d) {
    const n = this.filtered().length;
    if (!n) return;
    this.sel = (this.sel + d + n) % n;
    this.highlight();
  }

  execSelected() {
    const items = this.filtered();
    const cmd   = items[Math.min(this.sel, items.length - 1)];
    if (cmd) this.exec(cmd);
  }

  exec(cmd) {
    if (cmd.type === 'win') {
      this.close();
      setTimeout(() => this.onOpenWin && this.onOpenWin(), 70);
    } else if (cmd.type === 'scroll') {
      this.close();
      setTimeout(() => scrollToSection(cmd.id), 70);
    } else {
      window.open(cmd.url, cmd.url.startsWith('http') ? '_blank' : '_self', 'noopener');
      this.close();
    }
  }

  onKey(e) {
    if (!this.isOpen) return;
    if (e.key === 'Escape')    { e.preventDefault(); this.close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); this.move(1); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); this.move(-1); }
    else if (e.key === 'Enter')     { e.preventDefault(); this.execSelected(); }
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 76;
  window.scrollTo({ top, behavior: 'smooth' });
}
