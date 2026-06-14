// command files call defineCommand() to register themselves. load order is this
// file, output.js, shell.js, the commands, then main.js, so everything is
// registered by the time the shell boots.

const CommandRegistry = {
  list:  [],
  index: {},

  // group omitted means runnable but hidden from help. root restricts to root,
  // clears wipes the screen, bare skips the trailing blank line. see context.md.
  define(def) {
    if (!def || !def.name) throw new Error('defineCommand: a command needs a name');
    if (typeof def.run !== 'function') throw new Error('defineCommand: "' + def.name + '" needs a run() function');
    this.list.push(def);
    [def.name].concat(def.aliases || []).forEach(n => { this.index[n] = def; });
    return def;
  },

  find(name)  { return this.index[name]; },
  group(name) { return this.list.filter(c => c.group === name); },

  // Single-word names + aliases, used for tab-completion and suggestions.
  names() {
    const out = [];
    this.list.forEach(c => [c.name].concat(c.aliases || []).forEach(n => {
      if (!/\s/.test(n)) out.push(n);
    }));
    return out;
  },
};

// The one function every command file uses.
window.defineCommand = def => CommandRegistry.define(def);
window.CommandRegistry = CommandRegistry;
