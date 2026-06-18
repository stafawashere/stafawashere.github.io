const CommandRegistry = {
  list:  [],
  index: {},

  define(def) {
    if (!def || !def.name) throw new Error('defineCommand: a command needs a name');
    if (typeof def.run !== 'function') throw new Error('defineCommand: "' + def.name + '" needs a run() function');
    this.list.push(def);
    [def.name].concat(def.aliases || []).forEach(n => { this.index[n] = def; });
    return def;
  },

  find(name)  { return this.index[name]; },
  group(name) { return this.list.filter(c => c.group === name); },

  names() {
    const out = [];
    this.list.forEach(c => [c.name].concat(c.aliases || []).forEach(n => {
      if (!/\s/.test(n)) out.push(n);
    }));
    return out;
  },
};

window.defineCommand = def => CommandRegistry.define(def);
window.CommandRegistry = CommandRegistry;
