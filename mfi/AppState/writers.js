import { ping } from 'lambdagrid-mfi';
import { fromJS } from 'immutable';

function filterData(state) {
  const dailyOrHourly = state.get('currentChart');
  const filters = state.get('filters').filter(f => f.isChecked).map(f => f.name);
  return ping('API', 'request', 'filter data', { filters, dailyOrHourly })
    .then(rows => state.set(dailyOrHourly), fromJS(rows));
}

export default const writers = {
  'filter data': filterData,
  'toggle filter': toggleFilter,
  'pick hourly': state => state.set('currentChart', 'hourly'),
};
