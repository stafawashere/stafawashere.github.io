// clears:true tells the shell to skip rendering the return value
defineCommand({
  name: 'clear', aliases: ['cls'], group: 'core', clears: true,
  summary: 'wipe the screen',
  run() { return []; },
});
