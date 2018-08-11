import { on, ping } from 'lambdagrid-mfi';

on(
  'AppState',
  'read',
  'start',
  reader => (new Promise((go, stop) => reader == 'daily data' ? go() : stop()))
    .then(() => ping('Flash', 'info', "Loading your data. This could take a while")),
);

on(
  'AppState',
  'read',
  'end',
  () => ping('Flash', 'success', "Here's your data! Thanks for waiting."),
);
