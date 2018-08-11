import { fromJS } from 'immutable';

function readDailyData(state) {
  if (state.has('daily')) {
    return state.get('daily');
  } else {
    return ping('API', 'request', 'get daily data')
      .then(rows => state.set('daily', fromJS(rows)));
  }
}

function readHourlyData(state) {
  if (state.has('hourly')) {
    return state.get('hourly');
  } else {
    return ping('API', 'request', 'get hourly data')
      .then(rows => state.set('hourly', fromJS(rows)));
  }
}

function readFilters(state) {
  if (state.has('filters')) {
    return state.get('filters');
  } else {
    const makeFilter = f => ({ name: f, isChecked: false });
    return ping('API', 'request', 'get filters')
      .then(filters => state.set('filters', fromJS(filters).map(makeFilter)));
  }
}

export default const readers = {
  'daily data': readDailyData,
  'hourly data': readHourlyData,
  'filters': readFilters,
});
