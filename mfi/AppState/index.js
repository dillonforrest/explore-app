import { ping } from 'lambdagrid-mfi';
import { fromJS } from 'immutable';
import readers from './readers';
import writers from './writers';

ping('AppState', 'set initial state', fromJS({
  currentChart: 'daily',
}));
ping('AppState', 'add readers', readers);
ping('AppState', 'add writers', writers);
