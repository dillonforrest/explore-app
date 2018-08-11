import { on, ping } from 'lambdagrid-mfi';
import { wait } from 'lambdagrid-mfi/promise-utils'

let isDone = false;

function ifNotDone(cb) {
  return isDone ? Promise.reject : cb();
}

on(
  'AppState',
  'read',
  'start',
  function onReadStart(reader) {
    return new Promise((go, stop) => reader == 'daily data' ? go() : stop())
      .then(() => ping('Flash', 'info', "Loading your data. This could take a while."))
      .then(ifNotDone(sleep(2000)))
      .then(ifNotDone(() => ping('Flash', 'info', "There's lots of data to crunch!")));
  }
);

on(
  'AppState',
  'read',
  'end',
  reader => reader == 'daily data' ? Promise.resolve() : Promise.reject()
    .then(() => {
      isDone = true;
      return Promise.resolve();
    })
    .then(() => ping('Flash', 'clear'))
    .then(() => ping('Flash', 'success', "Here's your data! Thanks for waiting.")),
  () => ping('Flash', 'success', "Here's your data! Thanks for waiting."),
);
